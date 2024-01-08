import { Component, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { LoginservicesService } from '../logindesign/services/login.service';
import { ResponseIdetailProfile, ResponseI, UserHistory, User } from './models/profile-models';
import { ProfileService } from './services/profile.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
// import Swal from 'sweetalert2';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalsComponent } from './modals-progress/modals.component';
import { ModalService } from './services/modal.service';
import { ListActivities, ResponseProgressProfile } from './models/response.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public responseActual: ResponseI | null = null;
  public response: any

  nombreCompleto: string | null = null
  rol: string | null = null
  correo: string | null = null
  user_id: number | null = null
  usuario: string | null = null
  cursos_adquiridos: number | null = null
  cursos_pendientes: number | null = null
  cursos_terminados: number | null = null
  nombre_plan: string | null = null
  historial: UserHistory[] | null = null
  list_activities: ListActivities[] | null = null

  porcentaje_plan: number | null = null
  estado_suscripcion: boolean | null = null
  modalContent: string | null = null; // Inicializa modalContent con null
  modalRef: MdbModalRef<ModalsComponent> | undefined;

  constructor(
    private modalService: ModalService, private loginservice: LoginservicesService, private profileservice: ProfileService, private sanitizer: DomSanitizer
  ) {
    this.responseActual = this.loginservice.getResponseActual();

    this.user_id = this.responseActual?.data.id ?? null;
    this.usuario = this.responseActual?.data.username ?? null;

  }


  @Output()
  emitter = new Subject<any>();
  errorMsj: any = "";

  ngOnInit() {
    this.datosPersonales();
    this.getProfileDetails(this.user_id)
    this.getProfileProgress(this.user_id)

  }
  getIconUrl(item: any): SafeResourceUrl {
    // Genera la URL segura para el icono SVG
    const iconUrl = `assets/media/icons/duotune/${item.icon}.svg`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(iconUrl);
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
        this.historial = res.user_history;

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

  abrirModal(typeStateModal: string) {
    console.log("11111111111")
    if (this.list_activities !== null) {
      console.log(this.list_activities)

      this.modalService.abrirModal(typeStateModal, this.list_activities);
    }
  }


  redirectTransferProfile(codeRedirect: string): void {
    // this.modalService.cerrarModal(typeStateModal)
    console.log(codeRedirect)
    this.profileservice.redirectTransferProfile(codeRedirect);
  }

}
