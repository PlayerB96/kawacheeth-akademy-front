import { Component, OnInit, Output } from '@angular/core';
import { TransferService } from '../services/transfer.service';
import { ActualPayment, ResponsePayment } from '../models/response.interface';
import { ResponseI } from 'src/app/profile/models/profile-models';
import { LoginservicesService } from 'src/app/logindesign/services/login.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-modals-historial',
  templateUrl: './modals-historial.component.html',
  styleUrls: ['./modals-historial.component.scss']
})
export class ModalsHistorialComponent implements OnInit {
  public response: any
  public responseActual: ResponseI | null = null;

  stateSuscription: boolean = true;
  metodoPago: string = '';
  state_payment: string = '';

  cuenta: string = '';
  cod_cuenta: string | null = null
  actualPayment: ActualPayment | null = null

  constructor(private transferService: TransferService, private loginservice: LoginservicesService) {
    this.responseActual = this.loginservice.getResponseActual();

    this.cod_cuenta = this.responseActual?.data.cod_cuenta ?? null;

  }
  @Output()
  emitter = new Subject<any>();
  errorMsj: any = "";

  ngOnInit() {
    this.getDataPayment(this.cod_cuenta);

  }

  public getDataPayment(cod_cuenta: any) {
    this.response = this.transferService.getPaymentData(cod_cuenta)
    this.response.subscribe((res: ResponsePayment) => {
      if (res != null) {
        this.actualPayment = res.data.actual_payment
        this.state_payment = res.data.actual_payment.state_payment
        console.log(this.actualPayment)

      }
    })
  }

}
