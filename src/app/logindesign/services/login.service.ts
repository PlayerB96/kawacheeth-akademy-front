import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ResponseI } from '../modelos/response.interface';
import { LoginI } from '../modelos/login.interface';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import {Md5} from 'ts-md5';

@Injectable({
  providedIn: 'root'
})
export class LoginservicesService {

  url: string = "http://localhost:3222/api/v1/user/login?"
  constructor(private http: HttpClient, private router : Router) {

  }


  public loginByEmail( form: LoginI): Observable<ResponseI>{
    let passwmd5 = Md5.hashStr(form.password)
    let baseUrl = this.url;
    let response = this.http.get<ResponseI>(baseUrl + 'user='+form.usuario +'&pass=' +passwmd5)

    return response;
  }


  public logout(): void {
    localStorage.removeItem("token");
    this.router.navigate(['login'])
  }



}
