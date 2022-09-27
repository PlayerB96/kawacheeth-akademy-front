import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServiciosService } from '../login/services/servicios.service';
import { LoginI } from '../login/modelos/login.interface';
import { Router } from '@angular/router';
import { ResponseI } from '../login/modelos/response.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


   loginForm = new FormGroup({
    usuario: new FormControl('', ),
    password: new FormControl('',)
  })
  constructor(private serviceLogin : ServiciosService, private router : Router) { }

  errorStatus: boolean = false;
  errorMsj: any = "";

  ngOnInit(): void {
    console.log("iniciando login")

  }



  onLogin(form: any){
    this.serviceLogin.loginByEmail(form).subscribe(data =>{
      let dataResponse: ResponseI = data
      // console.log(dataResponse)

      if ( dataResponse.status == true){
        localStorage.setItem("token", dataResponse.data.token);
        this.router.navigate(["alertas"])
      }
      else if ( dataResponse.status == false){
        console.log(dataResponse)
        this.errorStatus = true;
        this.errorMsj = dataResponse.message;
      }
    })
  }



}
