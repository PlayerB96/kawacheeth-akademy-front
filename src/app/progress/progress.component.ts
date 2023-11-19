import { Component, OnInit, Output } from '@angular/core';
import { LoginservicesService } from '../logindesign/services/login.service';
import { ProfileService } from '../profile/services/profile.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Historial, ResponseI, ResponseIdetailProfile } from '../profile/models/profile-models';
import { Subject } from 'rxjs';
import { ListActivities, ResponseProgressProfile } from '../profile/models/response.interface';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {

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
  localidad: string | null = null
  list_activities: ListActivities[] | null = null
  usermd5: string | null = null
  copied: boolean = false;


  porcentaje_plan: string | null = null
  estado_suscripcion: boolean | null = null
  modalContent: string | null = null; // Inicializa modalContent con null
  selectedOption: string = '0'; // Propiedad para rastrear la opción seleccionada

  constructor(
    private loginservice: LoginservicesService, private profileservice: ProfileService, private sanitizer: DomSanitizer
  ) {
    this.responseActual = this.loginservice.getResponseActual();

    this.cod_cuenta = this.responseActual?.data.cod_cuenta ?? null;
    this.usuario = this.responseActual?.data.usuario ?? null;
    if (this.usuario !== null) {
      this.usermd5 = Md5.hashStr(this.usuario);
    }
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

  toggleDivs(option: string) {
    this.selectedOption = option;
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


}
