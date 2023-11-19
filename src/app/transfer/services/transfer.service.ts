import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ResponseChangedDolar, ResponsePayment } from '../models/response.interface';
import { FileItem, FileUploader, FileUploaderOptions } from 'ng2-file-upload';

@Injectable({
  providedIn: 'root'
})
export class TransferService {


  public responseActual!: Response;
  private uploadCompleteSubject = new Subject<any>();

  url: string = "http://localhost:8000/api/v1/"

  public uploader: FileUploader = new FileUploader({ url: this.url + 'profile/imageUpload' });

  constructor(private http: HttpClient) {
    this.uploader.onBeforeUploadItem = (item: FileItem) => {
      item.withCredentials = false;
    };

    this.uploader.onCompleteItem = (item: FileItem, response: string, status: number) => {
      // Manejar la lógica de la respuesta aquí si es necesario
      this.uploadCompleteSubject.next(response);
    };
  }


  public getValorDolar(): Observable<ResponseChangedDolar> {

    const response = this.http.get<ResponseChangedDolar>(this.url + 'profile/changedDolar');

    return response;
  }


  public getPaymentData(cod_cuenta: string): Observable<ResponsePayment> {
    const body = {
      cod_cuenta: cod_cuenta,
    };
    const response = this.http.post<ResponsePayment>(this.url + 'profile/detailPayment', body);

    return response;
  }

  public setImage(image: File, usuario: string): Observable<any> {
    const options: FileUploaderOptions = {
      url: this.url + 'profile/imageUpload',
      additionalParameter: { usuario: usuario }
    };

    const fileItem = new FileItem(this.uploader, image, options);
    this.uploader.queue.push(fileItem);

    // Inicia la carga manualmente
    fileItem.upload();

    // Devuelve un observable que notifica cuando la carga está completa
    return this.uploadCompleteSubject.asObservable();
  }
}
