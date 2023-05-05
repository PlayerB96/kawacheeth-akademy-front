import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataSharingService } from 'src/app/data-sharing.service';
import { ProfileRequest } from '../models/requests.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  public responseActual!: Response;

  url: string = "http://localhost:8000/api/v1/loginValidation"
  constructor(private http: HttpClient, private router: Router, private sharedDataService: DataSharingService) {}


  public getProfileDetails(profile: ProfileRequest): Observable<Response> {
    const body = {
      usuario: profile.cod_cuenta,
    };
  
    const response = this.http.post<Response>(this.url, body);

    return response;
  }
}
