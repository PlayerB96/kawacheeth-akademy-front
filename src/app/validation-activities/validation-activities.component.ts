import { Component, OnInit, ViewChild } from '@angular/core';
import {
  DataItem,
  ReportValidation,
  ResponseValidation,
} from './models/response.interface';
import { BehaviorSubject, Subscription, interval } from 'rxjs';
import { ResponseI } from '../profile/models/profile-models';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ReportPaymentService } from '../report-payment/services/report-payment.service';
import { LoginservicesService } from '../logindesign/services/login.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { ValidationActitiesService } from './services/validation-actities.service';
import { DatePipe } from '@angular/common';
import { ResponseReport } from '../report-payment/models/response.interface';

let ELEMENT_DATAV2: DataItem[] = [];

@Component({
  selector: 'app-validation-activities',
  templateUrl: './validation-activities.component.html',
  styleUrls: ['./validation-activities.component.scss'],
})
export class ValidationActivitiesComponent implements OnInit {
  private subscription: Subscription | undefined;
  dataSourceSubject = new BehaviorSubject<any[]>([]);
  public responseActual: ResponseI | null = null;
  loading: boolean = false; // Añade esta línea para definir la propiedad loading

  fechaInicio: string | undefined;
  fechaFin: string | undefined;
  usuario: string | null = null;
  constructor(
    private datePipe: DatePipe,
    private _liveAnnouncer: LiveAnnouncer,
    private validationService: ValidationActitiesService,
    private loginservice: LoginservicesService
  ) {
    this.fechaInicio = this.getFormattedDate(new Date());
    this.fechaFin = this.getFormattedDate(new Date(), true);
    // this.responseActual = this.loginservice.getResponseActual();
  }

  ngOnInit(): void {
    // Obtener la fecha actual
    const fechaActual = new Date();
    this.cargarResponseActual();
    // Formatear la fecha al formato 'yyyy-MM-dd'
    this.fechaInicio =
      this.datePipe.transform(fechaActual, 'yyyy-MM-dd') + 'T00:00:00';
    this.fechaFin =
      this.datePipe.transform(fechaActual, 'yyyy-MM-dd') + 'T23:59:59';

    if (this.fechaInicio != null && this.fechaFin) {
      this.getDataPayment(this.fechaInicio, this.fechaFin);

      // Suscribe a cambios en el dataSourceSubject
      this.dataSourceSubject.subscribe((data) => {
        this.dataSource.data = data;
      });

      // Llama a getDataPayment cada 10 segundos
      this.subscription = interval(20000).subscribe(() => {
        this.getDataPayment(this.fechaInicio!, this.fechaFin!);
        console.log('Actualizando cada 20 segundos');
      });
    }
  }
  ngOnDestroy(): void {
    // Importante: Cancela la suscripción al destruir el componente
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  displayedColumns: string[] = [
    'usuario',
    'fecha_utc',
    'status_validation',
    'nivel',
    'code_activity',
    'actions',
  ];

  public response: any;
  dataSource = new MatTableDataSource<DataItem>(ELEMENT_DATAV2);

  cargarResponseActual() {
    this.loginservice.getResponseActual().then((response) => {
      this.responseActual = response;
      console.log(this.responseActual);
      console.log('#####');

      if (this.responseActual) {
        this.usuario = this.responseActual?.data.username;
      } else {
        // No hay respuesta disponible
      }
    });
  }

  private getFormattedDate(date: Date, endOfMonth: boolean = false): string {
    const year = date.getFullYear();
    const month = this.padZero(date.getMonth() + 1); // Mes comienza desde 0

    let day = '01';
    let lastDay = this.padZero(
      new Date(year, date.getMonth() + 1, 0).getDate()
    ); // Último día del mes

    if (endOfMonth) {
      return `${lastDay}-${month}-${year} 23:59`;
    } else {
      return `${day}-${month}-${year} 00:00`;
    }
  }
  private padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;

    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  showImage(element: ReportValidation) {
    console.log('Delete:', element.image);
    window.open(element.image, '_blank', 'width=400,height=400');

    // Lógica para eliminar el elemento y abrir el modal con la imagen
  }

  public changedStateValidate(element: any) {
    console.log('#####11');

    if (this.usuario != null) {
      element.loadingState = true;
      console.log('#####11');
      this.response = this.validationService.changedStateValidate(
        element['user']['id'],
        element['name'],
        true
      );

      this.response
        .subscribe((res: ResponseReport) => {
          if (res != null) {
            this.getDataPayment(this.fechaInicio!, this.fechaFin!);
          }
        })
        .add(() => {
          element.loadingState = false;
        });
    }
  }

  public changedRefusedState(element: any) {
    if (this.usuario != null) {
      element.loadingState = true;

      console.log(element);
      this.response = this.validationService.changedStateValidate(
        element['user']['id'],
        element['name'],
        false
      );

      this.response
        .subscribe((res: ResponseReport) => {
          if (res != null) {
            this.getDataPayment(this.fechaInicio!, this.fechaFin!);
          }
        })
        .add(() => {
          element.loadingState = false;
        });
    }
  }

  public getDataPayment(fecha_inicio: string, fecha_fin: string) {
    this.validationService
      .getReportValidations(fecha_inicio, fecha_fin)
      .subscribe((res: ReportValidation[]) => {
        if (res != null) {
          this.dataSourceSubject.next(res);
          console.log(res); // Puedes hacer más cosas con res si es necesario
        }
      });
  }

  onDateInput(event: any, tipoFecha: string): void {
    const selectedDate: Date | null = event.value;

    if (selectedDate) {
      // Formatear la fecha de inicio con hora '00:00:00'
      const formattedDate: string =
        this.datePipe.transform(selectedDate, 'yyyy-MM-ddTHH:mm:ss') ?? '';

      if (tipoFecha === 'inicio') {
        // Manejar la fecha de inicio
        this.fechaInicio = formattedDate;
        console.log('Fecha inicio:', this.fechaInicio);
      } else if (tipoFecha === 'fin') {
        // Ajustar la fecha de fin para ser '23:59:59' del día actual
        const fechaFin = new Date(selectedDate);
        fechaFin.setHours(23, 59, 59);

        // Formatear la fecha de fin
        this.fechaFin =
          this.datePipe.transform(fechaFin, 'yyyy-MM-ddTHH:mm:ss') ?? '';
        console.log('Fecha fin:', this.fechaFin);
      }
    }
  }

  buscar(): void {
    if (this.fechaFin != null && this.fechaInicio != null) {
      console.log(this.fechaInicio);
      console.log(this.fechaFin);

      this.getDataPayment(this.fechaInicio, this.fechaFin);
    }
  }
}
