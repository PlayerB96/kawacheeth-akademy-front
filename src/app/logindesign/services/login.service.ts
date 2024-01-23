import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
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


  public loginByEmail(form: LoginI): Promise<ResponseI> {
    const body = {
      user: form.user,
      password: form.password,
    };

    const url = this.configService.apiUrl + 'validate-user/';
    return this.http.post<ResponseI>(url, body)
      .pipe(
        catchError((error) => this.handleError(error))
      )
      .toPromise()
      .then((res: ResponseI) => {
        this.setResponse(res);
        this.rol = res.data.rol;
        return res;
      });
  }

  private handleError(error: any): Promise<any> {
    if (error.status === 401) {
      // Manejar el error de credenciales inválidas
      return Promise.reject({ status: 401, message: 'Credenciales Inválidas' });
    } else {
      // Otro manejo de errores según sea necesario
      console.error('Error en la solicitud:', error);
      return Promise.reject(error);
    }
  }

  public setResponse(response: ResponseI): Promise<void> {
    return new Promise<void>((resolve) => {
      localStorage.setItem('responseActual', JSON.stringify(response));
      this.responseSubject.next(response);
      resolve();
    });
  }


  public async getResponseActual(): Promise<ResponseI | null> {
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
