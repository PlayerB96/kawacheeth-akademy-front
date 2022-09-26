import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Alert, ReqResponse } from '../modelos';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceTableService {

  private andreApi = "http://localhost:3222/api/v1/alerts";
  constructor(private http: HttpClient) {}

  getAlerts()  {
    return this.http.get<ReqResponse>(this.andreApi)
            .pipe(
              map( resp => {
                return resp.data.map( alert => {
                  // console.log(alert.descripcion)
                  return new Alert( alert.descripcion,  alert.estado, alert.evento, alert.id,  alert.placa)

                })
              })
            )
  }
}
