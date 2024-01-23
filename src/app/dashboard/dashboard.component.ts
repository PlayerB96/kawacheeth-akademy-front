import { Component, OnInit } from '@angular/core';
import { DashboardService } from './services/dashboard.service';
import { LoginservicesService } from '../logindesign/services/login.service';
import { ResponseI } from './models/dashboard-models';
import {
  BalanceResponse,
  Cursos,
  DataI,
  DetailStatusResponse,
  Last9User,
  Plataformas,
  ResponseIallUsersDashboard,
  ResponseIdetailDashboard,
  ValidationResponse,
} from './models/response.interface';
import { ModalService } from './services/modal.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public responseActual: ResponseI | null = null;

  public response: any;

  operatorId: string | null = null
  operatorKey: string | null = null
  cod_cuenta: string | null = null;
  cursos: number | null = null;
  cursos_activos: number | null = null;
  cursos_completados: number | null = null;
  cursos_poriniciar: number | null = null;
  lista_cursos: Cursos[] | null = null;
  plataformas: Plataformas[] | null = null;
  total_estudiante: number | null = null;
  icon_more_estudiantes: number | null = null;
  data_total_estudiantes: Last9User[] | null = null;
  status: boolean | null = null;
  nombreCompleto: string | null = null
  rol: string | null = null
  correo: string | null = null
  id: number | null = null;
  dashboardid: number | null = null;

  tokens: string | null = null;
  hbars: number | null = null;
  ctokensGenerate: number | null = null;
  hbarsdolares: number | null = null;
  interes: number | null = null;
  total: number | null = null;
  public loading: boolean = false; // Variable para controlar la visibilidad del spinner
  public responseMessage: string = ''; // Variable para almacenar el mensaje de respuesta del servicio

  constructor(
    private modalService: ModalService,
    private loginservice: LoginservicesService,
    private dashboardservice: DashboardService
  ) {
    // this.responseActual = this.loginservice.getResponseActual();
    this.ctokensGenerate = 0;

  }

  ngOnInit(): void {
    this.cargarResponseActual();
  }

  public getDashboardDetails(operatorId: string, operatorKey: string) {
    this.response = this.dashboardservice.getDashboardDetails(operatorId, operatorKey);
    this.response.subscribe((res: BalanceResponse) => {
      if (res != null) {
        console.log(res);
        console.log("##")
        const balanceCtokensString = res.balanceCtokens;
        const balanceCtokensNumber = parseInt(balanceCtokensString, 10);

        // Verificamos si la conversión a número fue exitosa
        if (!isNaN(balanceCtokensNumber)) {
          // Formateamos el número con separadores de miles y lo asignamos a this.tokens
          this.tokens = balanceCtokensNumber.toLocaleString();
        } else {
          // Manejar el caso en el que la conversión no fue exitosa
          console.error('No se pudo convertir balanceCtokens a número');
        }

        this.hbars = res.balanceHbars;
        this.hbarsdolares = res.balanceDollars;
      }
    });
  }

  public validationAccount() {
    // Comprobación de nulidad antes de llamar a la función
    if (this.operatorId != null && this.operatorKey != null && this.nombreCompleto != null && this.correo != null) {
      this.loading = true; // Activar el spinner cuando comienza la validación

      this.dashboardservice.validationAccount(
        this.operatorId,
        this.operatorKey,
        this.nombreCompleto,
        this.correo
      ).subscribe(
        (res: ValidationResponse) => {
          if (res != null) {
            this.responseMessage = res.message; // Almacenar el mensaje de respuesta del servicio
          }
        },
        (error: HttpErrorResponse) => {
          console.error('Error al validar la cuenta', error);
          this.responseMessage = 'Error al validar la cuenta'; // Puedes personalizar el mensaje de error
        },
        () => {
          this.loading = false; // Desactivar el spinner al completar la validación
        }
      );
    }
  }



  abrirModal(typeStateModal: string) {
    this.modalService.abrirModal(typeStateModal);
  }

  cargarResponseActual() {

    this.loginservice.getResponseActual().then((response) => {

      this.responseActual = response;
      if (this.responseActual) {
        this.nombreCompleto = this.responseActual.data.name + " " + this.responseActual.data.lastname;
        this.correo = this.responseActual.data.email;
        this.operatorId = this.responseActual.data.operatorId;
        this.id = this.responseActual.data.id;
        this.operatorKey = this.responseActual.data.operatorKey;
        this.dashboardid = this.responseActual.data.dashboardId;
        this.getDashboardStatusAccount(this.dashboardid, this.operatorId, this.operatorKey)


      }
    });
  }
  public getDashboardStatusAccount(dashboardid: number, operatorId: string, operatorKey: string) {

    this.response = this.dashboardservice.getDashboardStatusAccount(dashboardid);

    this.response.subscribe((res: DetailStatusResponse) => {
      if (res != null) {
        this.status = res.status;
        if (this.status) {
          this.getDashboardDetails(operatorId, operatorKey)
        }
      }
    });
  }

}
