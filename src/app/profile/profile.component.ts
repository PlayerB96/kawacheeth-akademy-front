import { Component, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { LoginservicesService } from '../logindesign/services/login.service';
import { ResponseI } from './models/profile-models';
import { ProfileService } from './services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public responseActual: ResponseI | null = null;

  nombreCompleto: string | null = null
  rol: string | null = null
  correo: string | null = null
  cod_cuenta: string | null = null

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
    console.log(this.responseActual);
  }

  public datosPersonales() {

    if (this.responseActual != null) {
      
      this.nombreCompleto = this.responseActual.data.nombres + " " + this.responseActual.data.apellidos;
      this.correo = this.responseActual.data.correo;
      this.rol = this.responseActual.data.rol;
    }
  }


  public getProfileDetails( cod_cuenta : any ) {
    console.log("--------------------")
    console.log(cod_cuenta)
    console.log("--------------------")

    this.profileservice.getProfileDetails(cod_cuenta)
    // if (this.responseActual != null) {
    //   this.nombreCompleto = this.responseActual.data.nombres + " " + this.responseActual.data.apellidos;
    //   this.correo = this.responseActual.data.correo;
    //   this.rol = this.responseActual.data.rol;
    // }

  }


  onLogout(): void {
    this.loginservice.logout();
  }
}
