import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from './services/register.service';
import { ResponseI } from '../logindesign/modelos/response.interface';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private serviceRegister: RegisterService, private router: Router) { }
  errorStatus: boolean = false;
  errorMsj: any = "";
  ngOnInit(): void {
  }

  registerForm = new FormGroup({

    nombreCompleto: new FormControl('',),
    apellido: new FormControl('',),
    correo: new FormControl('',),
    usuario: new FormControl('',),
    contrasena: new FormControl('',)
  })
  registeUser(form: any) {
    this.serviceRegister.registeUser(form).subscribe(data => {

      this.router.navigate(["login"])

    })
  }
}