import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginservicesService } from 'src/app/logindesign/services/login.service';
import { ResponseI } from 'src/app/profile/models/profile-models';
import { ResponseImage } from 'src/app/transfer/models/response.interface';
import { ModalService } from 'src/app/transfer/services/modal.service';
import { TransferService } from 'src/app/transfer/services/transfer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-validate-progress',
  templateUrl: './validate-progress.component.html',
  styleUrls: ['./validate-progress.component.scss']
})
export class ValidateProgressComponent implements OnInit {
  public responseActual: ResponseI | null = null;

  public response: any
  public responseImage: any
  imageName: string = '';
  public imagenSeleccionada: any
  loading: boolean = false; // Añade esta línea para definir la propiedad loading
  imagenEnviada: boolean = false;
  errorAlProcesarImagen: boolean = false;


  planValueT: number | null = null;
  timeValueT: number | null = null;

  dolarValue: number | null = null
  usuario: string | null = null
  id_user: number | null = null

  nivelActividad: string | null = null
  nombreActividad: string | null = null

  imgStatus: boolean = false
  @ViewChild('fileInput') fileInput: any;

  constructor(private loginservice: LoginservicesService, private modalService: ModalService, private transferservice: TransferService) {

  }

  ngOnInit(): void {
    this.cargarResponseActual();
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

  cargarResponseActual() {
    this.loginservice.getResponseActual().then((response) => {
      this.responseActual = response;
      console.log(this.responseActual)
      console.log("#####")

      if (this.responseActual) {
        this.id_user = this.responseActual?.data.id;
        this.usuario = this.responseActual?.data.username;
      } else {
        // No hay respuesta disponible
      }
    });
  }


  sendImage() {
    this.loading = true;
    this.errorAlProcesarImagen = false; // Reiniciar el indicador de error

    if (this.id_user && this.nivelActividad && this.nombreActividad) {
      this.responseImage = this.transferservice.setImageValidation(this.imagenSeleccionada, this.id_user, this.nivelActividad, this.nombreActividad);
      this.responseImage.subscribe(
        (res: ResponseImage) => {
          // Lógica de éxito
          this.imageName = 'Imagen Enviada con Éxito';
          this.loading = false;
          this.imagenEnviada = true;

        },
        (error: any) => {
          // Manejar el error
          console.error(error);
          if (error.status === 400) {
            this.imageName = error.error && error.error.error
              ? error.error.error
              : 'Error: Hubo un problema al procesar la imagen';
          } else {
            this.imageName = 'Error: Hubo un problema al procesar la imagen';
          }
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
