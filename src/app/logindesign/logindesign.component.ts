import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ResponseI } from './modelos/response.interface';
import { LoginservicesService } from './services/login.service';

@Component({
  selector: 'app-logindesign',
  templateUrl: './logindesign.component.html',
  styleUrls: ['./logindesign.component.scss']
})
export class LogindesignComponent implements OnInit {
  loginForm = new FormGroup({
    usuario: new FormControl('',),
    password: new FormControl('',)
  })
  constructor(private serviceLogin: LoginservicesService, private router: Router) {

  }

  errorStatus: boolean = false;
  errorMsj: any = "";

  ngOnInit(): void {
    console.log("iniciando login")
  }

  public onLogin(form: any) {
    this.serviceLogin.loginByEmail(form).subscribe(data => {
      let dataResponse: ResponseI = data
      // console.log(dataResponse)

      if (dataResponse.status == true) {
        localStorage.setItem("token", dataResponse.data.contrasena);
        this.router.navigate(["profile"])
        // Almacenar dataResponse en el servicio
      }
      else if (dataResponse.status == false) {
        console.log(dataResponse.message)
        this.errorStatus = true;
        this.errorMsj = dataResponse.message;
      }
    })
  }

  redirigir() {
    this.router.navigate(['/register']);
  }

}
