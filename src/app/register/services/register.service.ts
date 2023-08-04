import { Injectable } from '@angular/core';
import { RegisterI } from '../modelos/register.interface';
import { Md5 } from 'ts-md5';
import { ResponseI } from 'src/app/register/modelos/response.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  public responseActual!: ResponseI;
  private responseSubject: BehaviorSubject<ResponseI | null> = new BehaviorSubject<ResponseI | null>(null);

  url: string = "http://localhost:8000/api/v1/register"
  constructor(private http: HttpClient, private router: Router) { }


  public registeUser(form: RegisterI): Observable<ResponseI> {
    const body = {
      nombreCompleto: form.nombreCompleto,
      apellido: form.apellido,
      correo: form.correo,
      usuario: form.usuario,
      contrasena: form.contrasena
    };
    const response = this.http.post<ResponseI>(this.url, body);

    return response;

  }
}