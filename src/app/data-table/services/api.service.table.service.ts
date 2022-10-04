import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Alert, ReqResponse } from '../modelos';

var apiUrl = 'http://localhost:3222/api/v1';
var httpLink = {
  getAllAlerts: apiUrl + "/alerts",
  updateAlerts: apiUrl + "/update/alerts",
  deleteAlertById: apiUrl + "/delete/deleteAlertById",
  getAlertDetailById: apiUrl + "/getAlertDetailById",
  saveAlert: apiUrl + "/create/alert"
}

@Injectable({
  providedIn: 'root',
})
export class ApiServiceTableService {
  constructor(private http: HttpClient) {}

  public getAlerts(): Observable<ReqResponse> {
    return this.http.get<ReqResponse>(httpLink.getAllAlerts);

  }

  public createAlerts(alert:Alert): Observable<any> {
    return this.http.post(httpLink.saveAlert, alert);
  }

  public editarAlerts(alert:Alert): Observable<any> {
    return this.http.put(httpLink.updateAlerts+alert.id, alert);
  }

  public deleteAlerts(alert: Alert): Observable<any> {
    return this.http.post(httpLink.deleteAlertById+alert.id, alert);
  }

  public getAlertDetailById(alert: any): Observable<any> {
    return this.http.get(httpLink.getAlertDetailById + '?AlertId=' + alert.id);
  }


}
