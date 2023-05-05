import { Component, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { DataSharingService } from '../data-sharing.service';
import { LoginservicesService } from '../logindesign/services/login.service';
import { ResponseI } from './models/profile-models';

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


  constructor(
    private loginservice: LoginservicesService,
    private sharedDataService: DataSharingService,
  ) {
    this.responseActual = this.loginservice.getResponseActual();
  }


  @Output()
  emitter = new Subject<any>();

  ngOnInit() {
    this.datosPersonales();
    console.log(this.responseActual);
  }

  public datosPersonales() {

    if (this.responseActual != null) {
      
      this.nombreCompleto = this.responseActual.data.nombres + " " + this.responseActual.data.apellidos;
      this.correo = this.responseActual.data.correo;
      this.rol = this.responseActual.data.rol;
    }
  }


  public getProfileDetails() {

    if (this.responseActual != null) {
      this.nombreCompleto = this.responseActual.data.nombres + " " + this.responseActual.data.apellidos;
      this.correo = this.responseActual.data.correo;
      this.rol = this.responseActual.data.rol;
    }

  }


  onLogout(): void {
    this.loginservice.logout();
  }
}
