import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from './services/register.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public mostrarCampoAdicional = false;

  constructor(private serviceRegister: RegisterService, private router: Router) { }
  errorStatus: boolean = false;
  errorMsj: any = "";
  ngOnInit(): void {
  }

  registerForm = new FormGroup({
    nombreCompleto: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    correo: new FormControl('', [Validators.required, Validators.email]),
    usuario: new FormControl('', Validators.required),
    contrasena: new FormControl('', Validators.required),
    codigoReferido: new FormControl('',)
  });

  registeUser(form: any) {
    if (this.registerForm.valid) {
      this.serviceRegister.registeUser(form).subscribe(data => {
        console.log(data.user)
        Swal.fire({
          icon: "success",
          title: "Cuenta Creado con Éxito",
          showConfirmButton: false,
          timer: 1500
        });
        // this.router.navigate(["login"]);
      });
    } else {
      if (this.registerForm.get('correo')?.hasError('email')) {
        Swal.fire({
          title: 'Error',
          text: 'El formato del correo electrónico no es válido.',
          width: 400,
          padding: "3em",
          color: "#716add",
          backdrop: `
            rgba(0, 139, 123, 0.4)
            left top
            no-repeat
          `
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Por favor, complete todos los campos antes de enviar el formulario.',
          width: 400,
          padding: "3em",
          color: "#716add",
          backdrop: `
            rgba(0, 139, 123, 0.4)
            left top
            no-repeat
          `
        });
      }
    }
  }

  redirigir() {
    this.router.navigate(['/login']);
  }

  public toggleCampoAdicional() {
    this.mostrarCampoAdicional = !this.mostrarCampoAdicional;
  }
}