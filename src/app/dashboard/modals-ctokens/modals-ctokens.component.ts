import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { ProfileService } from 'src/app/profile/services/profile.service';
import Swal from 'sweetalert2';
import { DashboardService } from '../services/dashboard.service';
import { LoginservicesService } from 'src/app/logindesign/services/login.service';
import { ResponseI } from 'src/app/profile/models/profile-models';
import { TransferService } from 'src/app/transfer/services/transfer.service';
import { ResponseChangedDolar } from 'src/app/transfer/models/response.interface';

@Component({
  selector: 'app-modals-ctokens',
  templateUrl: './modals-ctokens.component.html',
  styleUrls: ['./modals-ctokens.component.scss'],
})
export class ModalsCtokensComponent implements OnInit {
  constructor(
    private dashboardService: DashboardService,
    private loginservice: LoginservicesService,
    private modalService: ModalService,
    private transferservice: TransferService
  ) {}
  selectedOptionPlan: string = '0';
  calculatedAmount: number | null = null;
  planValue: number | null = null;
  disabledDepositar: boolean | null = null;
  imageName: string = '';
  public imagenSeleccionada: any;
  imgStatus: boolean = false;
  loading: boolean = false;
  imagenEnviada: boolean = false;
  errorAlProcesarImagen: boolean = false;
  public responseImage: any;
  public responseActual: ResponseI | null = null;
  nombreCompleto: string | null = null;
  id_user: number | null = null;
  planValueT: number | null = null;
  public response: any;
  dolarValue: number | null = null;

  @ViewChild('fileInput') fileInput: any;

  ngOnInit(): void {
    this.disabledDepositar = true;
    this.getValorDolar();
    this.cargarResponseActual();
  }

  cargarResponseActual() {
    this.loginservice.getResponseActual().then((response) => {
      this.responseActual = response;

      if (this.responseActual) {
        this.nombreCompleto =
          this.responseActual.data.name +
          ' ' +
          this.responseActual.data.lastname;
        this.id_user = this.responseActual?.data.id;
      } else {
        // No hay respuesta disponible
      }
    });
  }

  cerrarModal(typeStateModal: string) {
    this.modalService.cerrarModal(typeStateModal);
  }

  calculateAmount() {
    if (this.selectedOptionPlan && this.dolarValue) {
      this.planValue = parseFloat(this.selectedOptionPlan.toString());
      this.calculatedAmount = this.planValue;
      this.planValueT = this.planValue;

      console.log(this.selectedOptionPlan.toString());
      if (this.planValue == 500) {
        this.planValue = this.planValue + 50;
      } else if (this.planValue == 1000) {
        this.planValue = this.planValue + 100;
      }
    }

    if (this.planValue == 0) {
      this.calculatedAmount = null;
      this.disabledDepositar = true;
    } else if (this.calculatedAmount != 0) {
      this.disabledDepositar = false;
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

  sendImage() {
    this.loading = true;
    this.errorAlProcesarImagen = false;
    console.log(this.id_user);
    console.log(this.planValueT);

    if (this.id_user && this.planValueT) {
      this.planValueT;
      this.responseImage = this.dashboardService.setImage(
        this.imagenSeleccionada,
        this.id_user,
        this.planValueT
      );

      this.responseImage.subscribe(
        (res: any) => {
          // Lógica de éxito
          this.imageName = 'Pago Enviado con Éxito';
          this.loading = false;
          this.imagenEnviada = true;
          console.log(res);
          console.log('##############');

          if (res.status === 400) {
            this.modalService.cerrarModal('ctokens');

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
              this.modalService.cerrarModal('ctokens');
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
