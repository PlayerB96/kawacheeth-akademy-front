import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ResponseI } from './modelos/response.interface';
import { LoginservicesService } from './services/login.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { LoginI } from './modelos/login.interface';

@Component({
  selector: 'app-logindesign',
  templateUrl: './logindesign.component.html',
  styleUrls: ['./logindesign.component.scss'],
})
export class LogindesignComponent implements OnInit {
  loginForm = new FormGroup({
    user: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(
    private serviceLogin: LoginservicesService,
    private router: Router
  ) { }
  public response: any;

  errorStatus: boolean = false;
  errorMsj: any = '';

  ngOnInit(): void {
    console.log('iniciando login');
  }

  public onLogin(form: any) {
    this.serviceLogin.loginByEmail(form)
      .then((res: ResponseI) => {
        let dataResponse: ResponseI = res;
        if (dataResponse.status === true) {
          localStorage.setItem('token', dataResponse.data.access_token);

          if (dataResponse.data.rol === 'Administrador') {
            this.router.navigate(['reportPayment']);
          } else {
            this.router.navigate(['profile']);
          }
        } else {
          this.errorStatus = true;
          this.errorMsj = dataResponse.message;
        }
      })
      .catch((error: any) => {
        // Manejo de errores aquí
        this.errorStatus = true;
        this.errorMsj = error.message || 'Error desconocido';
      });
  }



  redirigir() {
    this.router.navigate(['/register']);
  }
}
