import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AsociateResponse, BalanceResponse, DetailStatusResponse, ResponseIallUsersDashboard, ResponseIdetailDashboard, ValidationResponse } from '../models/response.interface';
import { Observable, catchError, flatMap, throwError } from 'rxjs';
import { ConfigService } from '../../../config.service';


const baseurHashGraph: string = "http://localhost:3000";
const baseurl: string = "http://localhost:8000";

@Injectable({
  providedIn: 'root'
})



export class DashboardService {
  detailDashboardAPI: string = `${baseurHashGraph}/api/balance`;
  validationAccountaAPI: string = `${baseurl}/api/validation_account_email`;

  constructor(private http: HttpClient, private router: Router, private configService: ConfigService) { }

  public getDashboardDetails(operatorId: string, operatorKey: string): Observable<BalanceResponse> {
    const body = {
      accountKey: operatorKey,

      accountId: operatorId
    };
    const response = this.http.post<BalanceResponse>(this.configService.apiUrlHashGraph + 'balance/', body);
    return response;
  }

  public getDashboardStatusAccount(id: number): Observable<DetailStatusResponse> {

    const response = this.http.get<DetailStatusResponse>(this.configService.apiUrl + 'dashboard/' + id);
    return response;
  }

  public validationAccount(operatorId: string, operatorKey: string, name: string, email: string): Observable<ValidationResponse> {
    const body = {
      name: name,
      email: email,
      affair: "Activación de Cuenta CheethAkademy",
      operatorKey: operatorKey,
      operatorId: operatorId
    };
    const bodyAsociate = {
      accountKey: operatorKey,
      accountId: operatorId
    };

    return this.http.post<AsociateResponse>(this.configService.apiUrlHashGraph + 'asociar-token/', bodyAsociate)
      .pipe(
        flatMap((asociateResponse: AsociateResponse) => {
          if (asociateResponse && asociateResponse.status === 200) {
            return this.http.post<ValidationResponse>(this.configService.apiUrl + 'validation_account_email/', body);
          } else {
            return throwError('Error en la petición balance');
          }
        }),
        catchError((error) => {
          console.error('Error en la petición validation_account_email:', error);
          return throwError('Error en la petición validation_account_email');
        })
      );
  }




  // public getDashboardallUser(): Observable<ResponseIallUsersDashboard> {

  //   const response = this.http.get<ResponseIallUsersDashboard>(this.allUsersDashboard);
  //   response.subscribe((res: ResponseIallUsersDashboard) => {
  //     console.log("***")
  //     console.log(res)
  //     console.log("***")
  //   });

  //   return response;
  // }
}
