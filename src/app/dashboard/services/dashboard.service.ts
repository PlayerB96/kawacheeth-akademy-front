import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BalanceResponse, ResponseIallUsersDashboard, ResponseIdetailDashboard } from '../models/response.interface';
import { Observable } from 'rxjs';
const baseurl: string = "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})



export class DashboardService {
  detailDashboard: string = `${baseurl}/api/balance`;
  // allUsersDashboard: string = `${baseurl}/api/v1/detailDashboard/AllUsers`;

  constructor(private http: HttpClient, private router: Router) { }

  public getDashboardDetails(cod_cuenta: any): Observable<BalanceResponse> {
    const body = {
      operatorKey: "302e020100300506032b6570042204201035935f406bd29f6e4128b2f86ae7c7fca24a5c9ee88413fa37f7502f969110",
      operatorId: "0.0.6768696"
    };
    const response = this.http.post<BalanceResponse>(this.detailDashboard, body);
    response.subscribe((res: BalanceResponse) => {

    });

    return response;
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
