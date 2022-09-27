import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ResponseI } from '../modelos/response.interface';
import { LoginI } from '../modelos/login.interface';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  url: string = "http://192.168.1.43:3555/api/v1/user/login?"
  constructor(private http: HttpClient, private router : Router) {

  }


  loginByEmail( form: LoginI): Observable<ResponseI>{
    let baseUrl = this.url;
    let response = this.http.get<ResponseI>(baseUrl + 'user='+form.usuario +'&pass=' +form.password)

    return response;
  }

  public checkLocalStorage(){

    if(localStorage.getItem('token')){
      console.log("cambiar a home")
    } else {
      console.log("mantenerse en login")
    }
  }

  public verifyLogged(): boolean {
    const token = localStorage.getItem('token');
   //  token ? true : false;
    return !! token;
  }

  public logout(): void {
    console.log("hola")
    localStorage.removeItem("token");
    this.router.navigate(['login'])
  }

}
