import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ResponseIdetailProfile, ResponseProgressProfile } from '../models/response.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  public responseActual!: Response;

  url: string = "http://localhost:8000/api/v1/"
  constructor(private http: HttpClient, private router: Router) { }


  public getProfileDetails(cod_cuenta: string): Observable<ResponseIdetailProfile> {
    const body = {
      cod_cuenta: cod_cuenta,
    };

    const response = this.http.post<ResponseIdetailProfile>(this.url + 'profile/detailProfile', body);

    return response;
  }

  public getProfileProgress(cod_cuenta: string, usuario: string): Observable<ResponseProgressProfile> {
    const body = {
      cod_cuenta: cod_cuenta,
      usuario: usuario
    };

    const response = this.http.post<ResponseProgressProfile>(this.url + 'profile/detailProgress', body);

    return response;
  }

  public redirectProgress(): void {
    this.router.navigate(['profile/progress'])
  }

  public redirectTransfer(): void {
    this.router.navigate(['profile/transfer'])
  }
}
