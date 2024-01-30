import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  DetailProfile,
  ResponseProgressProfile,
} from '../models/response.interface';
import { ConfigService } from '../../../config.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  public responseActual!: Response;

  constructor(
    private http: HttpClient,
    private router: Router,
    private configService: ConfigService
  ) {}

  public getProfileDetails(id: number): Observable<DetailProfile> {
    const url = this.configService.apiUrl + 'users/' + id + '/';

    // Añadimos las cabeceras a la solicitud
    const response = this.http.get<DetailProfile>(url);
    return response;
  }

  public getProfileProgress(
    user_id: number
  ): Observable<ResponseProgressProfile> {
    const body = {
      user_id: user_id,
    };
    const url = this.configService.apiUrl + 'user-activities/';

    const response = this.http.post<ResponseProgressProfile>(url, body);

    return response;
  }

  public redirectProgress(): void {
    this.router.navigate(['profile/progress']);
  }

  public redirectTransfer(): void {
    this.router.navigate(['profile/transfer']);
  }

  public redirectTransferProfile(codeRedirect: string): void {
    switch (codeRedirect) {
      case 'historial':
        this.router.navigate(['profile/transfer']);
        break;
      case 'progress':
        this.router.navigate(['profile/progress']);
        break; 
      case 'dashboard':
        this.router.navigate(['dashboard']);
        break;
      default:
        // Manejo para cualquier otro caso
        break;
    }
  }
}
