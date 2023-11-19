import { Component, OnInit, Output } from '@angular/core';
import { LoginservicesService } from '../logindesign/services/login.service';
import { ProfileService } from '../profile/services/profile.service';
import { Subject } from 'rxjs';
import { ResponseI, ResponseIdetailProfile } from '../profile/models/profile-models';
import { ModalService } from './services/modal.service';
import { TransferService } from './services/transfer.service';
import { ResponseChangedDolar } from './models/response.interface';
@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {

  public responseActual: ResponseI | null = null;
  public response: any

  nombreCompleto: string | null = null
  rol: string | null = null
  correo: string | null = null
  cod_cuenta: string | null = null
  usuario: string | null = null
  cursos_adquiridos: number | null = null
  cursos_pendientes: number | null = null
  cursos_terminados: number | null = null
  nombre_plan: string | null = null
  localidad: string | null = null
  disabledDepositar: boolean | null = null
  planValueT: number | null = null
  timeValueT: number | null = null
  discountMount: string | null = null



  porcentaje_plan: string | null = null
  estado_suscripcion: boolean | null = null
  modalContent: string | null = null; // Inicializa modalContent con null
  selectedOptionPlan: string = '0'; // Propiedad para rastrear la opción seleccionada
  selectedOptionTime: string = '0'; // Propiedad para rastrear la opción seleccionada
  calculatedAmount: number | null = null; // Inicialmente no se muestra el monto calculado
  calculatedAmountSoles: number | null = null;


  constructor(
    private modalServiceTransfer: ModalService, private loginservice: LoginservicesService, private profileservice: ProfileService
  ) {
    this.responseActual = this.loginservice.getResponseActual();

    this.cod_cuenta = this.responseActual?.data.cod_cuenta ?? null;
    this.usuario = this.responseActual?.data.usuario ?? null;
  }


  @Output()
  emitter = new Subject<any>();
  errorMsj: any = "";

  ngOnInit() {
    this.datosPersonales();
    this.getProfileDetails(this.cod_cuenta)
  }



  public datosPersonales() {

    if (this.responseActual != null) {

      this.nombreCompleto = this.responseActual.data.nombres + " " + this.responseActual.data.apellidos;
      this.correo = this.responseActual.data.correo;
      this.rol = this.responseActual.data.rol;

    }
  }

  public getProfileDetails(cod_cuenta: any) {

    this.response = this.profileservice.getProfileDetails(cod_cuenta)
    this.response.subscribe((res: ResponseIdetailProfile) => {
      if (res != null) {
        // console.log(res)
        this.cursos_adquiridos = res.data.cursos_adquiridos;
        this.cursos_pendientes = res.data.cursos_pendientes;
        this.cursos_terminados = res.data.cursos_terminados;
        this.nombre_plan = res.data.descripcion_plan.nombre_plan;
        this.porcentaje_plan = res.data.descripcion_plan.porcentaje_realizado;
        this.estado_suscripcion = res.data.estado_suscripcion;
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
        case (this.timeValueT == 3):
          this.discountMount = '5%';
          discount = 0.95;
          break;
        case (this.timeValueT == 6):
          this.discountMount = '10%';
          discount = 0.90;
          break;
        case (this.timeValueT == 12):
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

    this.modalServiceTransfer.abrirModal(typeStateModal, banco, ncuenta, true, '', '');

  }

  abrirModalHistorial(typeStateModal: string, metodPayment: string) {
    if (this.estado_suscripcion != null && this.nombreCompleto != null) {
      this.modalServiceTransfer.abrirModal(typeStateModal, '', '', this.estado_suscripcion, metodPayment, this.nombreCompleto);

    }

  }

  abrirVentanaCargarImagen(event: Event) {
    event.preventDefault(); // Evita que el enlace navegue directamente a la URL

    // Abre una nueva ventana (puedes ajustar los parámetros según tus necesidades)
    const nuevaVentana = window.open('https://tu-url-para-cargar-imagen', '_blank', 'width=600,height=400');

    // Puedes realizar otras acciones aquí si es necesario
  }


}
