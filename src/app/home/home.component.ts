import { Component, OnInit } from '@angular/core';
import { HomeService } from './services/home.service';
import { ResponseIdetailHome } from './models/response.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public response: any
  cod_acceso: string | null = "64dae04cc7b758fe8b0e4639"

  constructor(private homeservice: HomeService) { }

  ngOnInit(): void {
    this.getHomeDetails(this.cod_acceso)

  }
  public getHomeDetails(cod_acceso: any) {

    this.response = this.homeservice.getHomeDetails(cod_acceso)
    this.response.subscribe((res: ResponseIdetailHome) => {
      if (res != null) {
        console.log(res)
      }

    });


  }

}
