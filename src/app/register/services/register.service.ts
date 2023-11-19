import { Injectable } from '@angular/core';
import { RegisterI } from '../modelos/register.interface';
import { ResponseI } from 'src/app/register/modelos/response.interface';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  public responseActual!: ResponseI;
  private responseSubject: BehaviorSubject<ResponseI | null> = new BehaviorSubject<ResponseI | null>(null);
  statusUserT: boolean = false;

  url: string = "http://localhost:8000"
  constructor(private http: HttpClient, private router: Router) { }


  public registeUser(form: RegisterI): Observable<ResponseI> {
    const body = {
      nombreCompleto: form.nombreCompleto,
      apellido: form.apellido,
      correo: form.correo,
      usuario: form.usuario,
      contrasena: form.contrasena,
      codigoReferido: form.codigoReferido

    };

    return this.userValidate(form.usuario).pipe(
      switchMap((statusUser: boolean) => {
        if (!statusUser) {
          console.log("SE CREO EL USUARIO");
          return this.http.post<ResponseI>(this.url + '/api/v1/register', body);
        } else {
          Swal.fire({
            icon: "warning",
            title: 'Este usuario ya está en uso',
            width: 400,
            padding: "3em",
            color: "#716add",
            backdrop: `
              rgba(0, 139, 123, 0.4)
              left top
              no-repeat
            `
          });
          return of(); // Devuelve un observable vacío
        }
      }),
      catchError(error => {
        // Manejar errores de la llamada HTTP o cualquier otro error
        console.error('Error en la llamada HTTP', error);
        return of(); // Devuelve un observable vacío en caso de error
      })
    );
  }

  public userValidate(usuario: String): Observable<boolean> {
    const body = {
      usuario: usuario,
    };

    return this.http.post<ResponseI>(this.url + "/api/v1/validationUsers", body)
      .pipe(
        switchMap((res: ResponseI) => {
          this.statusUserT = res.status;
          return of(this.statusUserT);
        }),
        catchError(error => {
          // Manejar errores de la llamada HTTP o cualquier otro error
          console.error('Error en la validación del usuario', error);
          return of(false); // Devuelve false en caso de error
        })
      );
  }
}