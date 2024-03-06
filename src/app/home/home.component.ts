import { Component, OnInit } from '@angular/core';
import { HomeService } from './services/home.service';
import { HomeUpdates, Update } from './models/response.interface';
import { ProfileService } from '../profile/services/profile.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public response: any
  cod_acceso: string | null = "64dae04cc7b758fe8b0e4639"
  data_updates: Update[] | null = null;


  constructor(private homeservice: HomeService, private profileservice: ProfileService
  ) { }

  ngOnInit(): void {
    this.getHomeDetails(this.cod_acceso)

  }
  public getHomeDetails(cod_acceso: any) {

    this.response = this.homeservice.getHomeDetails(cod_acceso)
    this.response.subscribe((res: HomeUpdates) => {
      if (res != null) {
        console.log(res)
        this.data_updates = res.data
      }

    });


  }


  opcionSeleccionada(opcion: string): void {
    console.log(`Opción seleccionada: ${opcion}`);
    this.profileservice.redirectTransferProfile(opcion);

    // Puedes realizar acciones adicionales aquí según la opción seleccionada
  }

}
