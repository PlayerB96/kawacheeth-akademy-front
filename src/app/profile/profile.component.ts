import { Component, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { LoginservicesService } from '../logindesign/services/login.service';
import {
  ResponseIdetailProfile,
  ResponseI,
  UserHistory,
  User,
} from './models/profile-models';
import { ProfileService } from './services/profile.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
// import Swal from 'sweetalert2';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalsComponent } from './modals-progress/modals.component';
import { ModalService } from './services/modal.service';
import {
  ListActivities,
  ResponseProgressProfile,
} from './models/response.interface';
import { DashboardService } from '../dashboard/services/dashboard.service';
import { DetailStatusResponse } from '../dashboard/models/response.interface';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public responseActual: ResponseI | null = null;
  public response: any;
  status: boolean | null = null;

  nombreCompleto: string | null = null;
  rol: string | null = null;
  correo: string | null = null;
  operatorId: string | null = null;
  operatorKey: string | null = null;
  user_id: number | null = null;
  usuario: string | null = null;
  cursos_activos: number | null = null;
  cursos_completados: number | null = null;
  cursos_poriniciar: number | null = null;
  nombre_plan: string | null = null;
  historial: UserHistory[] | null = null;
  list_activities: ListActivities[] | null = null;
  dashboardid: number | null = null;

  porcentaje_plan: number | null = null;
  estado_suscripcion: boolean | null = null;
  modalContent: string | null = null; // Inicializa modalContent con null
  modalRef: MdbModalRef<ModalsComponent> | undefined;

  constructor(
    private modalService: ModalService,
    private loginservice: LoginservicesService,
    private profileservice: ProfileService,
    private dashboardservice: DashboardService,
    public dialog: MatDialog
  ) {
    this.user_id = this.responseActual?.data.id ?? null;
    this.usuario = this.responseActual?.data.username ?? null;
  }

  @Output()
  emitter = new Subject<any>();
  errorMsj: any = '';

  ngOnInit() {
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
        this.correo = this.responseActual.data.email;
        this.rol = this.responseActual.data.rol;
        this.usuario = this.responseActual.data.username;
        this.dashboardid = this.responseActual.data.dashboardId;
        this.getDashboardStatusAccount(this.dashboardid);
        this.getProfileDetails(this.responseActual.data.id);
        this.getProfileProgress(this.responseActual.data.id);
      } else {
        // No hay respuesta disponible
      }
    });
  }

  public getProfileDetails(user_id: any) {
    this.response = this.profileservice.getProfileDetails(user_id);
    this.response.subscribe((res: User) => {
      if (res != null) {
        this.cursos_activos = res.courses_acquired;
        this.cursos_poriniciar = res.courses_pending;
        this.cursos_completados = res.courses_completed;
        this.nombre_plan = res.subscription_plan.name;
        this.porcentaje_plan = res.percentage_completed;
        this.estado_suscripcion = res.subscription_state;
        this.historial = res.user_history;
        this.historial = this.historial.sort((a, b) => {
          return b.timestamp.localeCompare(a.timestamp); // Orden descendente, para que el más reciente esté primero
        });
      }
    });
  }

  public getProfileProgress(user_id: any) {
    this.response = this.profileservice.getProfileProgress(user_id);
    this.response.subscribe((res: ResponseProgressProfile) => {
      if (res != null) {
        this.list_activities = res.data;
        console.log(this.list_activities);
      }
    });
  }

  abrirModal(typeStateModal: string) {
    if (this.list_activities !== null) {
      console.log(this.status);

      if (this.status == false) {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
          width: '400px',
          data: {
            title: 'Confirmación',
            message: 'Aún no ha activado su cuenta ¿Desea Activarla?',
          },
        });

        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            this.redirectTransferProfile('dashboard');
            console.log(result);
          } else {
            console.log('#####NO##############');
          }
        });
      } else {
        this.modalService.abrirModal(typeStateModal, this.list_activities);
      }
    }
  }

  redirectTransferProfile(codeRedirect: string): void {
    // this.modalService.cerrarModal(typeStateModal)
    console.log(codeRedirect);
    this.profileservice.redirectTransferProfile(codeRedirect);
  }

  selectedAvatar: string = 'assets/media/avatars/blank.png'; // Avatar por defecto
  avatarList: string[] = [
    'assets/media/avatars/150-1.jpg',
    'assets/media/avatars/150-2.jpg',
    'assets/media/avatars/150-3.jpg',
    'assets/media/avatars/150-4.jpg',
    'assets/media/avatars/150-5.jpg',
  ];

  opcionSeleccionada(opcion: string): void {
    this.profileservice.redirectTransferProfile(opcion);

  }

  public getDashboardStatusAccount(dashboardid: number) {
    this.response =
      this.dashboardservice.getDashboardStatusAccount(dashboardid);

    this.response.subscribe((res: DetailStatusResponse) => {
      if (res != null) {
        this.status = res.status;
        console.log(this.status);
        console.log('##!#!#!');
      }
    });
  }
}
