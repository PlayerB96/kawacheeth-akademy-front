import { Component, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { LoginservicesService } from '../logindesign/services/login.service';
import { ResponseIdetailProfile, ResponseI } from './models/profile-models';
import { ProfileService } from './services/profile.service';

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
  cursos_adquiridos: number  | null = null
  cursos_pendientes: number  | null = null
  cursos_terminados: number  | null = null
  nombre_plan: string | null = null
  porcentaje_plan: string  | null = null
  estado_suscripcion: boolean  | null = null

  constructor(
    private loginservice: LoginservicesService, private profileservice: ProfileService
  ) {
    this.responseActual = this.loginservice.getResponseActual();

    this.cod_cuenta = this.responseActual?.data.cod_cuenta ?? null;
    console.log(this.cod_cuenta)
    
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
        console.log(res)
        console.log("9898989")
        this.cursos_adquiridos = res.data.cursos_adquiridos ;
        this.cursos_pendientes = res.data.cursos_pendientes;
        this.cursos_terminados = res.data.cursos_terminados;
        this.nombre_plan = res.data.descripcion_plan.nombre_plan;
        this.porcentaje_plan = res.data.descripcion_plan.porcentaje_realizado;
        this.estado_suscripcion = res.data.estado_suscripcion;
      }

    });


  }


  onLogout(): void {
    this.loginservice.logout();
  }
}
