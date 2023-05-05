import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ResponseI } from './profile/models/profile-models';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  private responseSubject: BehaviorSubject<ResponseI | null> = new BehaviorSubject<ResponseI | null>(null);

  constructor() {}

  public setResponse(response: ResponseI): void {
    localStorage.setItem('responseActual', JSON.stringify(response));
    this.responseSubject.next(response);
  }

}
