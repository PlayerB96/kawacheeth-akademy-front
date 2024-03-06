import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HomeUpdates } from '../models/response.interface';
import { ConfigService } from 'src/config.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  public responseActual!: Response;

  constructor(private http: HttpClient, private router: Router, private configService: ConfigService
  ) { }


  public getHomeDetails(cod_acceso: any): Observable<HomeUpdates> {

    const url = this.configService.apiUrl + 'home_updates_active/';

    const response = this.http.get<HomeUpdates>(url);
    return response;
  }
}
