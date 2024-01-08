import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { ResponseI } from '../modelos/response.interface';
import { LoginI } from '../modelos/login.interface';
import { Router } from '@angular/router';
import { ConfigService } from '../../../config.service';

@Injectable({
  providedIn: 'root'
})
export class LoginservicesService {
  public responseActual!: ResponseI;
  private responseSubject: BehaviorSubject<ResponseI | null> = new BehaviorSubject<ResponseI | null>(null);
  rol: string = '';
  constructor(private http: HttpClient, private router: Router, private configService: ConfigService) { }


  public loginByEmail(form: LoginI): Observable<ResponseI> {
    const body = {
      user: form.user,
      password: form.password,
    };

    const url = this.configService.apiUrl + 'validate-user/';
    const response = this.http.post<ResponseI>(url, body);
    response.subscribe((res: ResponseI) => {
      this.setResponse(res);
      this.rol = res.data.rol
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
    localStorage.removeItem("responseActual");

    this.router.navigate(['login'])
  }





}
