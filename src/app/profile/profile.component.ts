import { Component, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { LoginservicesService } from '../logindesign/services/login.service';
import { ResponseIdetailProfile, ResponseI, Historial } from './models/profile-models';
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
  cod_cuenta: string | null = null
  usuario: string | null = null
  cursos_adquiridos: number | null = null
  cursos_pendientes: number | null = null
  cursos_terminados: number | null = null
  nombre_plan: string | null = null
  historial: Historial[] | null = null
  list_activities: ListActivities[] | null = null

  porcentaje_plan: string | null = null
  estado_suscripcion: boolean | null = null
  modalContent: string | null = null; // Inicializa modalContent con null
  modalRef: MdbModalRef<ModalsComponent> | undefined;

  constructor(
    private modalService: ModalService, private loginservice: LoginservicesService, private profileservice: ProfileService, private sanitizer: DomSanitizer
  ) {
    this.responseActual = this.loginservice.getResponseActual();

    this.cod_cuenta = this.responseActual?.data.cod_cuenta ?? null;
    this.usuario = this.responseActual?.data.usuario ?? null;

    console.log(this.cod_cuenta)

  }


  @Output()
  emitter = new Subject<any>();
  errorMsj: any = "";

  ngOnInit() {
    this.datosPersonales();
    this.getProfileDetails(this.cod_cuenta)
    this.getProfileProgress(this.cod_cuenta, this.usuario)

  }
  getIconUrl(item: any): SafeResourceUrl {
    // Genera la URL segura para el icono SVG
    const iconUrl = `assets/media/icons/duotune/${item.icon}.svg`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(iconUrl);
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
        console.log(res)
        this.cursos_adquiridos = res.data.cursos_adquiridos;
        this.cursos_pendientes = res.data.cursos_pendientes;
        this.cursos_terminados = res.data.cursos_terminados;
        this.nombre_plan = res.data.descripcion_plan.nombre_plan;
        this.porcentaje_plan = res.data.descripcion_plan.porcentaje_realizado;
        this.estado_suscripcion = res.data.estado_suscripcion;
        this.historial = res.data.historial;


      }

    });

  }

  public getProfileProgress(cod_cuenta: any, usuario: any) {

    this.response = this.profileservice.getProfileProgress(cod_cuenta, usuario)
    this.response.subscribe((res: ResponseProgressProfile) => {
      if (res != null) {
        this.list_activities = res.data.list_activities
      }

    });

  }

  abrirModal(typeStateModal: string) {
    if (this.list_activities !== null) {
      this.modalService.abrirModal(typeStateModal, this.list_activities);
    }
  }




}
