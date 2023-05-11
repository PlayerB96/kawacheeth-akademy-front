import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProfileRequest } from '../models/requests.interface';
import { ResponseIdetailProfile } from '../models/response.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  public responseActual!: Response;

  url: string = "http://localhost:8000/api/v1/detailProfile"
  constructor(private http: HttpClient, private router: Router) {}


  public getProfileDetails(profile: any): Observable<ResponseIdetailProfile> {
    const body = {
      cod_cuenta: profile,
    };
    
    const response = this.http.post<ResponseIdetailProfile>(this.url, body);
    response.subscribe((res: ResponseIdetailProfile) => {
      console.log("***")
      console.log(res)
      console.log("***")
    });
   
    return response;
  }
}
