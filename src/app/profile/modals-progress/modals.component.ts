import { Component, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { ListActivities } from '../models/response.interface';
import { ProfileService } from '../services/profile.service';
import { ResponseI, User } from '../models/profile-models';
import { LoginservicesService } from 'src/app/logindesign/services/login.service';

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.scss'],
})
export class ModalsComponent implements OnInit {
  public response: any;
  nombre_plan: string | null = null;
  public responseActual: ResponseI | null = null;

  list_Activities: ListActivities[] | null = null;

  constructor(
    private modalService: ModalService,
    private profileservice: ProfileService,
    private loginservice: LoginservicesService
  ) {}

  ngOnInit(): void {
    this.list_Activities = this.modalService.list_Activities;
    this.cargarResponseActual();
  }

  cargarResponseActual() {
    this.loginservice.getResponseActual().then((response) => {
      this.responseActual = response;

      if (this.responseActual) {
        this.getProfileDetails(this.responseActual.data.id);
      } else {
        // No hay respuesta disponible
      }
    });
  }

  public getProfileDetails(user_id: any) {
    this.response = this.profileservice.getProfileDetails(user_id);
    this.response.subscribe((res: User) => {
      if (res != null) {
        this.nombre_plan = res.subscription_plan.name;
        console.log(this.nombre_plan);
      }
    });
  }
  cerrarModal(typeStateModal: string) {
    this.modalService.cerrarModal(typeStateModal);
  }

  redirectProgress(typeStateModal: string): void {
    this.modalService.cerrarModal(typeStateModal);

    this.profileservice.redirectProgress();
  }
}
