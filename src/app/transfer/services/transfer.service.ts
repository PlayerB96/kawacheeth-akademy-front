import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, tap } from 'rxjs';
import {
  ReportPayment,
  ResponseChangedDolar,
  ResponseImage,
  ResponsePayment,
} from '../models/response.interface';
import { FileItem, FileUploader, FileUploaderOptions } from 'ng2-file-upload';
import { ConfigService } from 'src/config.service';

@Injectable({
  providedIn: 'root',
})
export class TransferService {
  planName: string | null = null;
  // usuario: string | null = null
  public responseActual!: Response;
  discountMount: string | null = null;
  calculatedAmount: number | null = null;
  timePlan: number | null = null;

  constructor(private http: HttpClient, private configService: ConfigService) {}

  public getValorDolar(): Observable<ResponseChangedDolar> {
    const url = this.configService.apiUrl;

    const response = this.http.get<ResponseChangedDolar>(url + 'changed_dolar');

    return response;
  }

  public getPaymentData(user_id: string): Observable<ResponsePayment> {
    const body = {
      user_id: user_id,
    };
    const url = this.configService.apiUrl;

    const response = this.http.post<ResponsePayment>(
      url + 'user_historial_payment/',
      body
    );

    return response;
  }

  public setImage(
    image: File,
    usuario: number,
    planValue: number,
    timeValue: number,
    dolarValue: number
  ): Observable<ResponseImage> {
    switch (planValue) {
      case 9:
        this.planName = 'Asociado';
        break;
      case 19:
        this.planName = 'Profesional';
        break;
      default:
        this.planName = 'Socio';
        break;
    }

    let discount = 1.0; // Valor por defecto (sin descuento)
    let discountMountT = '0%'; // Por defecto, sin descuento
    this.discountMount = discountMountT;

    switch (true) {
      case timeValue == 3:
        this.discountMount = '5%';
        discount = 0.95;
        break;
      case timeValue == 6:
        this.discountMount = '10%';
        discount = 0.9;
        break;
      case timeValue == 12:
        this.discountMount = '25%';
        discount = 0.75;
        break;
    }
    this.calculatedAmount = planValue * timeValue * discount * dolarValue;
    this.timePlan = timeValue * 30;
    const montoCalculado = this.calculatedAmount.toFixed(2);

    console.log(usuario.toString());
    console.log(this.planName);
    console.log(montoCalculado.toString());
    console.log(image);

    console.log('####');

    const formData = new FormData();
    formData.append('image', image);
    formData.append('user', usuario.toString());
    formData.append('time', this.timePlan.toString()); // Usar "" como valor predeterminado si this.planName es null
    formData.append('plan', this.planName ?? ''); // Usar "" como valor predeterminado si this.planName es null
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

  public setImageValidation(
    image: File,
    id_user: number,
    nivelActividad: string,
    nombreActividad: string
  ): Observable<ReportPayment> {
    const formData = new FormData();
    console.log(id_user);
    formData.append('image', image);
    formData.append('user', id_user.toString());
    formData.append('level', nivelActividad);
    formData.append('name', nombreActividad);

    // Convertir FormData a un objeto simple
    const formDataObject: { [key: string]: any } = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    const url = this.configService.apiUrl;

    const response = this.http.post<ReportPayment>(
      url + 'report_validation/',
      formData
    );
    // Enviar la solicitud HTTP usando HttpClient
    return response;
  }
}
