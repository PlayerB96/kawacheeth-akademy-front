import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseIallUsersDashboard, ResponseIdetailDashboard } from '../models/response.interface';
import { Observable } from 'rxjs';
const baseurl: string = "http://localhost:8000";

@Injectable({
  providedIn: 'root'
})



export class DashboardService {
  detailDashboard: string = `${baseurl}/api/v1/detailDashboard`;
  allUsersDashboard: string = `${baseurl}/api/v1/detailDashboard/AllUsers`;

  constructor(private http: HttpClient, private router: Router) { }

  public getDashboardDetails(cod_cuenta: any): Observable<ResponseIdetailDashboard> {
    const body = {
      cod_cuenta: cod_cuenta,
    };
    const response = this.http.post<ResponseIdetailDashboard>(this.detailDashboard, body);
    response.subscribe((res: ResponseIdetailDashboard) => {

    });

    return response;
  }


  public getDashboardallUser(): Observable<ResponseIallUsersDashboard> {

    const response = this.http.get<ResponseIallUsersDashboard>(this.allUsersDashboard);
    response.subscribe((res: ResponseIallUsersDashboard) => {
      console.log("***")
      console.log(res)
      console.log("***")
    });

    return response;
  }
}
