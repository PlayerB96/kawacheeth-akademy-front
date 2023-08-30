import { Component, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { LoginservicesService } from '../logindesign/services/login.service';
import { ResponseIdetailProfile, ResponseI, Historial } from './models/profile-models';
import { ProfileService } from './services/profile.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
  cursos_adquiridos: number | null = null
  cursos_pendientes: number | null = null
  cursos_terminados: number | null = null
  nombre_plan: string | null = null
  historial: Historial[] | null = null

  porcentaje_plan: string | null = null
  estado_suscripcion: boolean | null = null

  constructor(
    private loginservice: LoginservicesService, private profileservice: ProfileService, private sanitizer: DomSanitizer
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
        console.log(this.historial);
        console.log("#####");

      }

    });


  }


  onLogout(): void {
    this.loginservice.logout();
  }
}
