import { Component, OnInit } from '@angular/core';
import { DashboardService } from './services/dashboard.service';
import { LoginservicesService } from '../logindesign/services/login.service';
import { ResponseI } from './models/dashboard-models';
import {
  BalanceResponse,
  Cursos,
  DataI,
  Last9User,
  Plataformas,
  ResponseIallUsersDashboard,
  ResponseIdetailDashboard,
} from './models/response.interface';
import { ModalService } from './services/modal.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public responseActual: ResponseI | null = null;
  public response: any;

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

  tokens: string | null = null;
  hbars: number | null = null;
  ctokensGenerate: number | null = null;
  hbarsdolares: number | null = null;
  interes: number | null = null;
  total: number | null = null;

  constructor(
    private modalService: ModalService,
    private loginservice: LoginservicesService,
    private dashboardservice: DashboardService
  ) {
    this.responseActual = this.loginservice.getResponseActual();
    this.ctokensGenerate = 0;

    this.cod_cuenta = this.responseActual?.data.username ?? null;
    // console.log(this.cod_cuenta)
  }

  ngOnInit(): void {
    this.getDashboardDetails(this.cod_cuenta);
    // this.getDashboardallUser()
  }

  public getDashboardDetails(cod_cuenta: any) {
    this.response = this.dashboardservice.getDashboardDetails(cod_cuenta);
    this.response.subscribe((res: BalanceResponse) => {
      if (res != null) {
        console.log(res);
        console.log('####');

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

  abrirModal(typeStateModal: string) {
    console.log('11111111111');

    this.modalService.abrirModal(typeStateModal);
  }
}
