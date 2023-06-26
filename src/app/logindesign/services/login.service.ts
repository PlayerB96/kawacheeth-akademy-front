import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject , Observable, throwError } from 'rxjs';
import { ResponseI } from '../modelos/response.interface';
import { LoginI } from '../modelos/login.interface';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginservicesService {
  public responseActual!: ResponseI;
  private responseSubject: BehaviorSubject<ResponseI | null> = new BehaviorSubject<ResponseI | null>(null);

  url: string = "http://localhost:8000/api/v1/loginValidation"
  constructor(private http: HttpClient, private router: Router) {}


  public loginByEmail(form: LoginI): Observable<ResponseI> {
    const passwmd5 = Md5.hashStr(form.password);
    const body = {
      usuario: form.usuario,
      contrasena: passwmd5
    };
  
    const response = this.http.post<ResponseI>(this.url, body);

    response.subscribe((res: ResponseI) => {
      this.setResponse(res);
    });
    return response;
    
  }
  
  public setResponse(response: ResponseI): void {
    localStorage.setItem('responseActual', JSON.stringify(response));
    this.responseSubject.next(response);
  }

  public getResponseActual(): ResponseI | null {
    const responseStr = localStorage.getItem('responseActual');
    if (responseStr) {
      return JSON.parse(responseStr) as ResponseI;
    } else {
      return null;
    }
  }
  
  public logout(): void {
    localStorage.removeItem("token");
    this.router.navigate(['login'])
  }


  
}
