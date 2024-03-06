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
  typeAlert: string; // Declaración de la propiedad typeAlert
  errorStatus: boolean;
  errorMsj: string;
  loading: boolean = false; // Añade esta línea para definir la propiedad loading
  registerStatus: boolean = false

  constructor(private serviceRegister: RegisterService, private router: Router) {
    this.typeAlert = ''; // Inicialización opcional
    this.errorStatus = false;
    this.errorMsj = '';
  }

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
      this.loading = true;
      this.registerStatus = true;

      this.serviceRegister.registeUser(form).subscribe(
        (data) => {
          console.log(data.user);
          this.registerStatus = false;

          this.loading = false;
          this.typeAlert = 'alert alert-success';
          this.errorStatus = true;
          this.errorMsj = 'Cuenta creada con éxito.';
        },
        (error) => {
          this.loading = false;
          this.typeAlert = 'alert alert-danger';
          this.errorStatus = true;
          if (error.status === 400) {
            // Manejar el caso de usuario ya en uso
            this.errorMsj = 'Este usuario ya está en uso.';
          } else {
            // Manejar otros errores de la llamada HTTP o cualquier otro error
            this.errorMsj = 'Error con el Servidor.';
          }
        }
      );
    } else {
      this.typeAlert = 'alert alert-danger';
      this.errorStatus = true;
      if (this.registerForm.get('correo')?.hasError('email')) {
        this.errorMsj = 'El formato del correo electrónico no es válido.';
      } else {
        this.errorMsj = 'Por favor, complete todos los campos antes de enviar el formulario.';
      }
    }
  }


  // registeUser(form: any) {

  //   if (this.registerForm.valid) {
  //     this.loading = true;

  //     this.serviceRegister.registeUser(form).subscribe(data => {
  //       console.log(data.user)
  //       this.loading = false;
  //       this.typeAlert = 'alert alert-success';
  //       this.errorStatus = true;
  //       this.errorMsj = 'Cuenta creada con éxito.';

  //       // this.router.navigate(["login"]);
  //     });
  //   } else {
  //     this.typeAlert = 'alert alert-danger';
  //     this.errorStatus = true;
  //     if (this.registerForm.get('correo')?.hasError('email')) {
  //       this.errorMsj = 'El formato del correo electrónico no es válido.';
  //     } else {
  //       this.errorMsj = 'Por favor, complete todos los campos antes de enviar el formulario.';
  //     }
  //   }
  // }


  redirigir() {
    this.router.navigate(['/login']);
  }

  public toggleCampoAdicional() {
    this.mostrarCampoAdicional = !this.mostrarCampoAdicional;
  }
}