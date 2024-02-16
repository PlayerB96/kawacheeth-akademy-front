import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  AsociateResponse,
  BalanceResponse,
  DetailStatusResponse,
  ResponseIallUsersDashboard,
  ResponseIdetailDashboard,
  ValidationResponse,
} from '../models/response.interface';
import { Observable, catchError, flatMap, throwError } from 'rxjs';
import { ConfigService } from '../../../config.service';
import {
  ResponseChangedDolar,
  ResponseImage,
} from 'src/app/transfer/models/response.interface';

const baseurHashGraph: string = 'http://localhost:3000';
const baseurl: string = 'http://localhost:8000';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  planName: string | null = null;
  discountMount: string | null = null;
  calculatedAmount: number | null = null;
  public response: any;
  dolarValue: number | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private configService: ConfigService
  ) {}

  public getDashboardDetails(
    operatorId: string,
    operatorKey: string
  ): Observable<BalanceResponse> {
    const body = {
      accountKey: operatorKey,

      accountId: operatorId,
    };
    const response = this.http.post<BalanceResponse>(
      this.configService.apiUrlHashGraph + 'balance/',
      body
    );
    return response;
  }

  public getDashboardUsers(): Observable<ResponseIallUsersDashboard> {
    const response = this.http.get<ResponseIallUsersDashboard>(
      this.configService.apiUrl + 'users/'
    );
    return response;
  }

  public getDashboardStatusAccount(
    id: number
  ): Observable<DetailStatusResponse> {
    const response = this.http.get<DetailStatusResponse>(
      this.configService.apiUrl + 'dashboard/' + id
    );
    console.log(response);
    return response;
  }

  public validationAccount(
    operatorId: string,
    operatorKey: string,
    name: string,
    email: string
  ): Observable<ValidationResponse> {
    const body = {
      name: name,
      email: email,
      affair: 'Activación de Cuenta CheethAkademy',
      operatorKey: operatorKey,
      operatorId: operatorId,
    };
    const bodyAsociate = {
      accountKey: operatorKey,
      accountId: operatorId,
    };

    return this.http
      .post<AsociateResponse>(
        this.configService.apiUrlHashGraph + 'asociar-token/',
        bodyAsociate
      )
      .pipe(
        flatMap((asociateResponse: AsociateResponse) => {
          if (asociateResponse && asociateResponse.status === 200) {
            return this.http.post<ValidationResponse>(
              this.configService.apiUrl + 'validation_account_email/',
              body
            );
          } else {
            return throwError('Error en la petición balance');
          }
        }),
        catchError((error) => {
          console.error(
            'Error en la petición validation_account_email:',
            error
          );
          return throwError('Error en la petición validation_account_email');
        })
      );
  }

  public setImage(
    image: File,
    usuario: number,
    planValue: number
  ): Observable<ResponseImage> {
    let discountMountT = '0%'; // Por defecto, sin descuento
    this.discountMount = discountMountT;

    const montoCalculado = planValue.toFixed(2);

    console.log(usuario.toString());
    console.log(montoCalculado.toString());
    console.log(image);

    console.log('####');

    const formData = new FormData();
    formData.append('image', image);
    formData.append('user', usuario.toString());
    formData.append('plan', 'Ctokens'); // Usar "" como valor predeterminado si this.planName es null
    formData.append('monto_usd', montoCalculado.toString());
    // Convertir FormData a un objeto simple
    const formDataObject: { [key: string]: any } = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });
    const url = this.configService.apiUrl;
    const response = this.http.post<ResponseImage>(
      url + 'report_payment_validation/',
      formData
    );
    return response;
  }

  public getValorDolar() {
    const url = this.configService.apiUrl;
    this.response = this.http.get<ResponseChangedDolar>(url + 'changed_dolar');
    this.response.subscribe((res: ResponseChangedDolar) => {
      if (res != null) {
        this.dolarValue = res.data.venta;
      }
    });
  }
}
