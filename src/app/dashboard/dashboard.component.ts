import { Component, OnInit } from '@angular/core';
import { DashboardService } from './services/dashboard.service';
import { LoginservicesService } from '../logindesign/services/login.service';
import { ResponseI } from './models/dashboard-models';
import { Cursos, DataI, Last9User, Plataformas, ResponseIallUsersDashboard, ResponseIdetailDashboard } from './models/response.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public responseActual: ResponseI | null = null;
  public response: any

  cod_cuenta: string | null = null
  cursos: number | null = null
  cursos_activos: number | null = null
  cursos_completados: number | null = null
  cursos_poriniciar: number | null = null
  lista_cursos: Cursos[] | null = null
  plataformas: Plataformas[] | null = null
  total_estudiante: number | null = null
  icon_more_estudiantes: number | null = null
  data_total_estudiantes: Last9User[] | null = null

  tokens: number | null = null
  dolares: number | null = null
  interes: number | null = null
  total: number | null = null


  constructor(
    private loginservice: LoginservicesService, private dashboardservice: DashboardService
  ) {
    this.responseActual = this.loginservice.getResponseActual();

    this.cod_cuenta = this.responseActual?.data.username ?? null;
    console.log(this.cod_cuenta)

  }

  ngOnInit(): void {
    this.getDashboardDetails(this.cod_cuenta)
    this.getDashboardallUser()

  }

  public getDashboardDetails(cod_cuenta: any) {

    this.response = this.dashboardservice.getDashboardDetails(cod_cuenta)
    this.response.subscribe((res: ResponseIdetailDashboard) => {
      if (res != null) {

        this.cursos = res.data.detalle.cursos
        this.cursos_activos = res.data.detalle.estado_cursos.activos
        this.cursos_completados = res.data.detalle.estado_cursos.completados
        this.cursos_poriniciar = res.data.detalle.estado_cursos.poriniciar
        this.lista_cursos = res.data.lista_cursos;

        this.tokens = res.data.tokens;
        this.interes = res.data.interes;
        this.dolares = this.tokens / 10;
        this.total = this.dolares + this.interes;

      }
    });
  }

  public getDashboardallUser() {

    this.response = this.dashboardservice.getDashboardallUser()
    this.response.subscribe((res: ResponseIallUsersDashboard) => {
      if (res != null) {
        this.total_estudiante = res.data.total_users;

        if (res.data.total_users > 9) {
          this.icon_more_estudiantes = res.data.total_users - 9;
        } else {
          this.icon_more_estudiantes = 0
        }
        this.data_total_estudiantes = res.data.last_9_users;
        console.log("###########")
      }
    });
  }
}
