import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ProfileService } from 'src/app/profile/services/profile.service';
import { TransferService } from '../services/transfer.service';
import { ReportPayment, ResponseChangedDolar, ResponseImage } from '../models/response.interface';
import { LoginservicesService } from 'src/app/logindesign/services/login.service';
import { ResponseI } from 'src/app/profile/models/profile-models';
import { ModalService } from '../services/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modals-transferencialocal',
  templateUrl: './modals-transferencialocal.component.html',
  styleUrls: ['./modals-transferencialocal.component.scss'],

})
export class ModalsTransferencialocalComponent implements OnInit {
  public response: any
  public responseImage: any

  public responseActual: ResponseI | null = null;
  public imagenSeleccionada: any
  loading: boolean = false; // Añade esta línea para definir la propiedad loading
  imagenEnviada: boolean = false;
  errorAlProcesarImagen: boolean = false;

  imageName: string = '';

  selectedOptionPlan: string = '0';
  selectedOptionTime: string = '0';
  calculatedAmount: number | null = null;
  calculatedAmountSoles: number | null = null;
  planValueT: number | null = null;
  timeValueT: number | null = null;
  disabledDepositar: boolean | null = null;
  discountMount: string | null = null;
  dolarValue: number | null = null
  id_user: number | null = null
  usuario: string | null = null
  imgStatus: boolean = false

  bancoLocal: string = 'banco';
  numeroCuenta: string = 'n cuenta';
  @ViewChild('fileInput') fileInput: any;


  constructor(private modalService: ModalService, private loginservice: LoginservicesService, private transferservice: TransferService) {

  }

  ngOnInit() {
    this.getValorDolar();
    this.cargarResponseActual();
  }


  calculateAmount() {
    if (this.selectedOptionPlan && this.selectedOptionTime) {
      var planValue = parseFloat(this.selectedOptionPlan.toString());
      var timeValue = parseFloat(this.selectedOptionTime.toString());
      this.calculatedAmount = planValue * timeValue;
      this.planValueT = planValue;
      this.timeValueT = timeValue;
      this.disabledDepositar = true;

      let discount = 1.0;
      let discountMountT = '0%';
      this.discountMount = discountMountT;

      switch (true) {
        case this.timeValueT == 3:
          this.discountMount = '5%';
          discount = 0.95;
          break;
        case this.timeValueT == 6:
          this.discountMount = '10%';
          discount = 0.90;
          break;
        case this.timeValueT == 12:
          this.discountMount = '25%';
          discount = 0.75;
          break;
      }

      this.calculatedAmount = planValue * timeValue * discount;
      if (this.dolarValue != null) {
        this.calculatedAmountSoles = planValue * timeValue * discount * this.dolarValue;

      }
      if (this.planValueT == 0 && this.timeValueT == 0) {
        this.calculatedAmount = null;
      } else if (this.calculatedAmount != 0) {
        this.disabledDepositar = false;
      }
    }
  }

  cargarResponseActual() {
    this.loginservice.getResponseActual().then((response) => {
      this.responseActual = response;


      if (this.responseActual) {
        this.id_user = this.responseActual?.data.id;
      } else {
        // No hay respuesta disponible
      }
    });
  }



  public getValorDolar() {
    this.response = this.transferservice.getValorDolar()
    this.response.subscribe((res: ResponseChangedDolar) => {
      if (res != null) {
        this.dolarValue = res.data.venta
      }
    });
  }

  activarCargadorImagen() {
    // Simula un clic en el input de archivo cuando se hace clic en el botón
    this.fileInput.nativeElement.click();
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

  resetearSeleccion() {
    this.imagenSeleccionada = null;
    this.imageName = '';
    this.imgStatus = false;
  }


  sendImage() {
    this.loading = true;
    this.errorAlProcesarImagen = false;

    if (this.id_user && this.planValueT && this.timeValueT) {
      this.responseImage = this.transferservice.setImage(this.imagenSeleccionada, this.id_user, this.planValueT, this.timeValueT);

      this.responseImage.subscribe(
        (res: any) => {
          this.imageName = 'Pago Enviado con Éxito';
          this.loading = false;
          this.imagenEnviada = true;
          console.log(res.status);


          if (res.status === 400) {
            this.modalService.cerrarModalTransfer('transferencia-local');

            Swal.fire({
              title: 'Error al Enviar Pago',
              width: 400,
              padding: "3em",
              color: "#716add",
              backdrop: `
                rgba(0, 139, 123, 0.4)
                left top
                no-repeat
              `
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
          console.log("#########################");

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


}
