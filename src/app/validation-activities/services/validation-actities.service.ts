import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReportPaymentValidation, ReportValidation, ResponseValidation } from '../models/response.interface';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/config.service';
import { ResponseReport } from 'src/app/report-payment/models/response.interface';

@Injectable({
  providedIn: 'root'
})
export class ValidationActitiesService {


  constructor(private http: HttpClient, private configService: ConfigService) { }


  public getReportValidations(fecha_inicio: string, fecha_final: string): Observable<ReportValidation[]> {
    const url = this.configService.apiUrl;

    // Convertir las fechas al formato correcto
    const response = this.http.get<ReportValidation[]>(`${url}report_validation/?start_date=${fecha_inicio}&end_date=${fecha_final}`);
    return response;
  }




  public changedStateValidate(user_id: string, name: string, state_payment: boolean): Observable<ResponseReport> {
    const url = this.configService.apiUrl;

    const body = {
      user_id: user_id,
      name: name,
      status: state_payment
    };
    console.log(body)
    const response = this.http.post<ResponseReport>(url + 'update_hito_status/', body);

    return response;
  }


}
