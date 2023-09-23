import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ResponseIdetailHome } from '../models/response.interface';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  public responseActual!: Response;

  url: string = "http://localhost:8000/api/v1/detailHome"
  constructor(private http: HttpClient, private router: Router) {}


  public getHomeDetails(cod_acceso: any): Observable<ResponseIdetailHome> {
    const body = {
      cod_acceso: cod_acceso,
    };
    
    const response = this.http.post<ResponseIdetailHome>(this.url, body);
   
    return response;
  }
}
