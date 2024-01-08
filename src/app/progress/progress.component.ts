import { Component, OnInit, Output } from '@angular/core';
import { LoginservicesService } from '../logindesign/services/login.service';
import { ProfileService } from '../profile/services/profile.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UserHistory, ResponseI, ResponseIdetailProfile, User } from '../profile/models/profile-models';
import { Subject } from 'rxjs';
import { ListActivities, ResponseProgressProfile } from '../profile/models/response.interface';
import { Md5 } from 'ts-md5';
import { ModalService } from './services/modal.service';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {

  public responseActual: ResponseI | null = null;
  public response: any
  selectedHito: any;

  nombreCompleto: string | null = null
  rol: string | null = null
  correo: string | null = null
  cod_cuenta: string | null = null
  usuario: string | null = null
  cursos_adquiridos: number | null = null
  cursos_pendientes: number | null = null
  cursos_terminados: number | null = null
  nombre_plan: string | null = null
  historial: UserHistory[] | null = null
  localidad: string | null = null
  list_activities: ListActivities[] | null = null
  usermd5: string | null = null
  copied: boolean = false;

  nombreValidation: string = '';
  nivelValidation: string = '';
  codigoValidation: string = '';
  user_id: number | null = null
  porcentaje_plan: number | null = null
  estado_suscripcion: boolean | null = null
  modalContent: string | null = null; // Inicializa modalContent con null
  selectedOption: string = '0'; // Propiedad para rastrear la opción seleccionada

  constructor(
    private modalServiceTransfer: ModalService, private loginservice: LoginservicesService, private profileservice: ProfileService, private sanitizer: DomSanitizer
  ) {
    this.responseActual = this.loginservice.getResponseActual();

    this.user_id = this.responseActual?.data.id ?? null;
    this.usuario = this.responseActual?.data.username ?? null;
    if (this.usuario !== null) {
      this.usermd5 = Md5.hashStr(this.usuario);
    }
    console.log(this.user_id)

  }
  @Output()
  emitter = new Subject<any>();
  errorMsj: any = "";

  ngOnInit() {

    this.datosPersonales();
    this.getProfileDetails(this.user_id)
    this.getProfileProgress(this.user_id)


  }

  public datosPersonales() {

    if (this.responseActual != null) {

      this.nombreCompleto = this.responseActual.data.name + " " + this.responseActual.data.lastname;
      this.correo = this.responseActual.data.email;
      this.rol = this.responseActual.data.rol;

    }
  }

  public getProfileDetails(user_id: any) {

    this.response = this.profileservice.getProfileDetails(user_id)
    this.response.subscribe((res: User) => {
      if (res != null) {

        this.cursos_adquiridos = res.courses_acquired;
        this.cursos_pendientes = res.courses_pending;
        this.cursos_terminados = res.courses_completed;
        this.nombre_plan = res.subscription_plan.name;
        this.porcentaje_plan = res.percentage_completed;
        this.estado_suscripcion = res.subscription_state;
        // this.historial = res.data.historial;
      }
    });

  }



  public getProfileProgress(user_id: any) {

    this.response = this.profileservice.getProfileProgress(user_id)
    this.response.subscribe((res: ResponseProgressProfile) => {
      if (res != null) {
        this.list_activities = res.data
      }

    });

  }

  toggleDivs() {
    if (this.selectedHito) {
      console.log(this.selectedHito.code)
      this.nombreValidation = this.selectedHito.name
      this.nivelValidation = this.selectedHito.level
      this.codigoValidation = this.selectedHito.code

    }
  }
  copyToClipboard() {
    if (this.usermd5 !== null) {
      const input = document.createElement('input');
      input.value = this.usermd5;
      document.body.appendChild(input);
      input.select();

      try {
        document.execCommand('copy');
        this.copied = true;
      } catch (err) {
        console.error('No se pudo copiar al portapapeles:', err);
      } finally {
        document.body.removeChild(input);
      }
    }
  }

  abrirModal(typeStateModal: string, selectedOption: string) {

    this.modalServiceTransfer.abrirModal(typeStateModal, selectedOption);

  }
}
