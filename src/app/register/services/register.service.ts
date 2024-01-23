import { Injectable } from '@angular/core';
import { RegisterI } from '../modelos/register.interface';
import { ResponseI } from 'src/app/register/modelos/response.interface';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { switchMap, catchError } from 'rxjs/operators';
import { ConfigService } from 'src/config.service';
import { User } from 'src/app/profile/models/profile-models';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  public responseActual!: ResponseI;
  private responseSubject: BehaviorSubject<ResponseI | null> = new BehaviorSubject<ResponseI | null>(null);
  statusUserT: boolean = false;

  // url: string = "http://localhost:8000"
  constructor(private http: HttpClient, private router: Router, private configService: ConfigService) { }


  public registeUser(form: RegisterI): Observable<User> {
    const body = {
      user: form.usuario,
      password: form.contrasena,
      email: form.correo,
      lastname: form.apellido,
      name: form.nombreCompleto,
      rol: "Estudiante",
      // codigoReferido: form.codigoReferido
      activities: [
        {
          "title": "Iniciando CheethAkademy",
          "detail_status": "Sin Suscripción",
          "status": true,
          "level": 1,
          "description": "Completa todas las tareas para avanzar el progreso y obtener la recompensa",
          "hitos": [
            {
              "name": "Redes Sociales",
              "code": "0001",
              "status": true
            },
            {
              "name": "Invita un Amigo",
              "code": "0002",
              "status": true
            },
            {
              "name": "Culmina un Bootcamp",
              "code": "0003",
              "status": true
            }
          ]
        },
        {
          "title": "Siendo parte de la Comunidad",
          "detail_status": "Socio",
          "status": false,
          "level": 2,
          "description": "Adquiere un plan para poder seguir obtiendo recompensas",
          "hitos": [
            {
              "name": "Adquiere CTokens",
              "code": "0004"
            },
            {
              "name": "Adquiere 10 Cursos",
              "code": "0005"
            },
            {
              "name": "Culmina 10 Bootcamps",
              "code": "0006"
            }
          ]
        }
      ],
      historial_payment: {
        "status_payment": false,
        "state_payment": "select",
        "hitos": [
          {
            "name": "Seleccione un Plan y un Método de Pago",
            "code": "selected"
          },
          {
            "name": "Realizando Validación de Pago...",
            "code": "validated"
          },
          {
            "name": "Pago Validado",
            "code": "filled"
          }
        ]
      }

    };

    const url = this.configService.apiUrl + 'users/';
    console.log(JSON.stringify(body, null, 2)); // El tercer parámetro (2) es para indentación
    console.log("######");

    return this.http.post<User>(url, body).pipe(
      catchError(error => {
        if (error.status === 400) {
          // Manejar el caso de usuario ya en uso
          Swal.fire({
            icon: 'warning',
            title: 'Este usuario ya está en uso',
            width: 400,
            padding: '3em',
            color: '#716add',
            backdrop: `
              rgba(0, 139, 123, 0.4)
              left top
              no-repeat
            `,
          });
        } else {
          // Manejar otros errores de la llamada HTTP o cualquier otro error
          console.error('Error en la llamada HTTP', error);
        }
        return of(); // Devuelve un observable vacío en caso de error
      })
    );
  }


}