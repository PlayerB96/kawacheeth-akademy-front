import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  url: string = "api/"
  constructor(private http: HttpClient) { }
}
