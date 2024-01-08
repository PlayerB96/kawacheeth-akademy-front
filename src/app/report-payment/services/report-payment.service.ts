import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseReport } from '../models/response.interface';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/config.service';
import { ReportPaymentValidation } from 'src/app/validation-activities/models/response.interface';

@Injectable({
  providedIn: 'root'
})
export class ReportPaymentService {

  constructor(private http: HttpClient, private configService: ConfigService) { }


  public getReportPaymentValidations(fecha_inicio: string, fecha_final: string): Observable<ReportPaymentValidation[]> {
    const url = this.configService.apiUrl;

    // Convertir las fechas al formato correcto
    const response = this.http.get<ReportPaymentValidation[]>(`${url}report_payment_validation/?start_date=${fecha_inicio}&end_date=${fecha_final}`);
    return response;
  }


  public changedStateValidate(user_id: string, name: string, state_payment: boolean): Observable<ResponseReport> {
    const url = this.configService.apiUrl;

    const body = {
      user_id: user_id,
      state: name,
      status: state_payment
    };
    console.log("#########################3")

    console.log(body)
    const response = this.http.post<ResponseReport>(url + 'update_hito_payment/', body);

    return response;
  }
}
