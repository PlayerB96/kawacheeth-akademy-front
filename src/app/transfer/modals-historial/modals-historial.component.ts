import { Component, OnInit, Output } from '@angular/core';
import { TransferService } from '../services/transfer.service';
import { ActualPayment, PaymentData, ResponsePayment } from '../models/response.interface';
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
  user_id: number | null = null
  actualPayment: PaymentData | null = null

  constructor(private transferService: TransferService, private loginservice: LoginservicesService) {
    this.responseActual = this.loginservice.getResponseActual();
    this.user_id = this.responseActual?.data.id ?? null;

  }
  @Output()
  emitter = new Subject<any>();
  errorMsj: any = "";

  ngOnInit() {
    this.getDataPayment(this.user_id);

  }

  public getDataPayment(user_id: any) {
    this.response = this.transferService.getPaymentData(user_id)
    this.response.subscribe((res: ResponsePayment) => {
      if (res != null) {
        this.state_payment = res.data.state_payment
        this.actualPayment = res.data
        console.log("####################33")
        console.log(this.actualPayment)
        console.log(this.actualPayment.state_payment)

        console.log("####################33")

      }
    })
  }

}
