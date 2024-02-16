import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { LoginservicesService } from '../logindesign/services/login.service';
import { ProfileService } from '../profile/services/profile.service';
import { Subject } from 'rxjs';
import { ResponseI, User } from '../profile/models/profile-models';
import { ModalService } from './services/modal.service';
import { TransferService } from './services/transfer.service';
import Swal from 'sweetalert2';
import { ResponseChangedDolar } from './models/response.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss'],
})
export class TransferComponent implements OnInit {
  public responseActual: ResponseI | null = null;
  public response: any;

  public responseImage: any;
  imageName: string = '';
  public imagenSeleccionada: any;
  loading: boolean = false; // Añade esta línea para definir la propiedad loading
  imagenEnviada: boolean = false;
  errorAlProcesarImagen: boolean = false;

  nombreCompleto: string | null = null;
  rol: string | null = null;
  correo: string | null = null;
  cod_cuenta: string | null = null;
  user_id: number | null = null;
  usuario: string | null = null;
  cursos_adquiridos: number | null = null;
  cursos_pendientes: number | null = null;
  cursos_terminados: number | null = null;
  nombre_plan: string | null = null;
  localidad: string | null = null;
  disabledDepositar: boolean | null = null;
  planValueT: number | null = null;
  timeValueT: number | null = null;
  discountMount: string | null = null;
  id_user: number | null = null;
  imgStatus: boolean = false;
  dolarValue: number | null = null;
  time: number | null = null;
  fechaFormateada: string | null = null;

  porcentaje_plan: number | null = null;
  subscripcion_days: number | null = null;
  subscripcion_time: number | null = null;
  estado_suscripcion: boolean | null = null;
  modalContent: string | null = null; // Inicializa modalContent con null
  selectedOptionPlan: string = '0'; // Propiedad para rastrear la opción seleccionada
  selectedOptionTime: string = '0'; // Propiedad para rastrear la opción seleccionada
  calculatedAmount: number | null = null; // Inicialmente no se muestra el monto calculado
  calculatedAmountSoles: number | null = null;
  percentagePlan: number | null = null; // Propiedad para rastrear la opción seleccionada
  differenceDaysPlan: number | null = null; // Propiedad para rastrear la opción seleccionada

  @ViewChild('fileInput') fileInput: any;

  constructor(
    private modalService: ModalService,
    private transferservice: TransferService,
    private modalServiceTransfer: ModalService,
    private loginservice: LoginservicesService,
    private profileservice: ProfileService,
    private datePipe: DatePipe
  ) {}

  @Output()
  emitter = new Subject<any>();
  errorMsj: any = '';

  ngOnInit() {
    this.getValorDolar();
    this.cargarResponseActual();
  }

  public datosPersonales() {
    if (this.responseActual != null) {
      this.nombreCompleto =
        this.responseActual.data.name + ' ' + this.responseActual.data.lastname;
      this.correo = this.responseActual.data.email;
      this.rol = this.responseActual.data.rol;
    }
  }

  public getProfileDetails(cod_cuenta: any) {
    this.response = this.profileservice.getProfileDetails(cod_cuenta);
    this.response.subscribe((res: User) => {
      if (res != null) {
        console.log(res);

        this.cursos_adquiridos = res.courses_acquired;
        this.cursos_pendientes = res.courses_pending;
        this.cursos_terminados = res.courses_completed;
        this.nombre_plan = res.subscription_plan.name;
        this.porcentaje_plan = res.percentage_completed;
        this.estado_suscripcion = res.subscription_state;
        this.subscripcion_days = res.subscription_days;
        this.subscripcion_time = res.subscription_time;

        this.percentagePlan =
          (this.subscripcion_days / this.subscripcion_time) * 100;
        this.differenceDaysPlan =
          this.subscripcion_time - this.subscripcion_days;
        console.log(this.differenceDaysPlan);
        this.calcularFechaFutura(this.differenceDaysPlan);
      }
    });
  }

  calcularFechaFutura(differenceDaysPlan: number) {
    const hoy = new Date();
    const fechaFutura = new Date(
      hoy.getTime() + differenceDaysPlan * 24 * 60 * 60 * 1000
    );
    this.fechaFormateada = this.datePipe.transform(
      fechaFutura,
      "dd 'de' MMMM 'de' y",
      'es-PE'
    );
  }

  cargarResponseActual() {
    this.loginservice.getResponseActual().then((response) => {
      this.responseActual = response;

      if (this.responseActual) {
        this.nombreCompleto =
          this.responseActual.data.name +
          ' ' +
          this.responseActual.data.lastname;
        this.correo = this.responseActual.data.email;
        this.rol = this.responseActual.data.rol;
        this.usuario = this.responseActual.data.username;
        this.id_user = this.responseActual?.data.id;
        console.log(this.responseActual);

        this.getProfileDetails(this.responseActual.data.id);
      } else {
        // No hay respuesta disponible
      }
    });
  }

  toggleDivs(option: string) {
    this.selectedOptionPlan = option;
  }

  toggleDivsTime(option: string) {
    this.selectedOptionTime = option;
  }

  calculateAmount() {
    if (this.selectedOptionPlan && this.selectedOptionTime) {
      var planValue = parseFloat(this.selectedOptionPlan.toString());
      var timeValue = parseFloat(this.selectedOptionTime.toString());
      this.calculatedAmount = planValue * timeValue;
      this.planValueT = planValue;
      this.timeValueT = timeValue;
      this.disabledDepositar = true;
      // const cambioSoles = 3.8; // Cambio en soles peruanos (ajusta según tu valor real)
      // this.calculatedAmountSoles = this.calculatedAmount * cambioSoles;
      // Definir un valor de descuento según las condiciones
      let discount = 1.0; // Valor por defecto (sin descuento)
      let discountMountT = '0%'; // Por defecto, sin descuento
      this.discountMount = discountMountT;

      switch (true) {
        case this.timeValueT == 3:
          this.discountMount = '5%';
          discount = 0.95;
          break;
        case this.timeValueT == 6:
          this.discountMount = '10%';
          discount = 0.9;
          break;
        case this.timeValueT == 12:
          this.discountMount = '25%';
          discount = 0.75;
          break;
      }
      this.calculatedAmount = planValue * timeValue * discount;

      if (this.planValueT == 0 && this.timeValueT == 0) {
        this.calculatedAmount = null;
      } else if (this.calculatedAmount != 0) {
        this.disabledDepositar = false;
      }
    }
  }

  abrirModal(typeStateModal: string, banco: string, ncuenta: string) {
    if (this.nombre_plan != null) {
      this.modalServiceTransfer.abrirModal(
        typeStateModal,
        banco,
        ncuenta,
        true,
        '',
        '',
        this.nombre_plan
      );
    }
  }

  abrirModalHistorial(typeStateModal: string, metodPayment: string) {
    if (
      this.estado_suscripcion != null &&
      this.nombreCompleto != null &&
      this.nombre_plan != null
    ) {
      this.modalServiceTransfer.abrirModal(
        typeStateModal,
        '',
        '',
        this.estado_suscripcion,
        metodPayment,
        this.nombreCompleto,
        this.nombre_plan
      );
    }
  }

  sendImage() {
    this.loading = true;
    this.errorAlProcesarImagen = false;
    if (this.id_user && this.planValueT && this.timeValueT && this.dolarValue) {
      this.responseImage = this.transferservice.setImage(
        this.imagenSeleccionada,
        this.id_user,
        this.planValueT,
        this.timeValueT,
        this.dolarValue
      );
      this.responseImage.subscribe(
        (res: any) => {
          // Lógica de éxito
          this.imageName = 'Pago Enviado con Éxito';
          this.loading = false;
          this.imagenEnviada = true;


          if (res.status === 400) {
            this.modalService.cerrarModalTransfer('transferencia-local');

            Swal.fire({
              title: 'Error al Enviar Pago',
              width: 400,
              padding: '3em',
              color: '#716add',
              backdrop: `
                rgba(0, 139, 123, 0.4)
                left top
                no-repeat
              `,
            });
          } else {
            setTimeout(() => {
              this.modalService.cerrarModalTransfer('transferencia-local');
            }, 3000);
          }
        },
        (error: any) => {
          // Manejar el error
          console.error(error);
          this.imageName = 'Error: Ya tiene un Pago pendiente';
          this.loading = false;
          this.errorAlProcesarImagen = true; // Establecer a true cuando hay un error
        }
      );
    } else {
      this.imageName = 'Error: Seleccione un Plan de Suscripción';
      this.loading = false;
    }
  }

  cargarImagen(event: any) {
    const files = event.target.files;

    if (files && files.length > 0) {
      const imagen = files[0];

      // Validar que el archivo sea una imagen (por extensión)
      const extensionesValidas = ['jpg', 'jpeg', 'png', 'gif'];
      const extension = imagen.name.split('.').pop().toLowerCase();

      if (extensionesValidas.includes(extension)) {
        this.imagenSeleccionada = imagen;
        this.imageName = imagen.name;
        this.imgStatus = true;
      } else {
        // Mostrar mensaje de error si el archivo no es una imagen
        alert('Por favor, selecciona un archivo de imagen válido.');
        this.resetearSeleccion();
      }
    }
  }

  activarCargadorImagen() {
    // Simula un clic en el input de archivo cuando se hace clic en el botón
    this.fileInput.nativeElement.click();
  }

  resetearSeleccion() {
    this.imagenSeleccionada = null;
    this.imageName = '';
    this.imgStatus = false;
  }

  public getValorDolar() {
    this.response = this.transferservice.getValorDolar();
    this.response.subscribe((res: ResponseChangedDolar) => {
      if (res != null) {
        this.dolarValue = res.data.venta;
      }
    });
  }
}
