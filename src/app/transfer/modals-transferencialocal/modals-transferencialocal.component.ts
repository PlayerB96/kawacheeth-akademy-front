import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ModalService } from 'src/app/profile/services/modal.service';
import { ProfileService } from 'src/app/profile/services/profile.service';
import { TransferService } from '../services/transfer.service';
import { ResponseChangedDolar } from '../models/response.interface';

@Component({
  selector: 'app-modals-transferencialocal',
  templateUrl: './modals-transferencialocal.component.html',
  styleUrls: ['./modals-transferencialocal.component.scss'],

})
export class ModalsTransferencialocalComponent implements OnInit {
  public response: any

  selectedOptionPlan: string = '0';
  selectedOptionTime: string = '0';
  calculatedAmount: number | null = null;
  calculatedAmountSoles: number | null = null;
  planValueT: number | null = null;
  timeValueT: number | null = null;
  disabledDepositar: boolean | null = null;
  discountMount: string | null = null;
  dolarValue: number | null = null
  bancoLocal: string = 'banco';
  numeroCuenta: string = 'n cuenta';
  @ViewChild('fileInput') fileInput: any;


  constructor(private modalService: ModalService, private profileservice: ProfileService, private transferservice: TransferService) {

  }

  ngOnInit(): void { this.getValorDolar(); }

  cerrarModal(typeStateModal: string) {
    this.modalService.cerrarModal(typeStateModal);
  }

  redirectTransfer(typeStateModal: string): void {
    this.modalService.cerrarModal(typeStateModal);
    this.profileservice.redirectTransfer();
  }

  calculateAmount() {
    if (this.selectedOptionPlan && this.selectedOptionTime) {
      var planValue = parseFloat(this.selectedOptionPlan.toString());
      var timeValue = parseFloat(this.selectedOptionTime.toString());
      this.calculatedAmount = planValue * timeValue;
      this.planValueT = planValue;
      this.timeValueT = timeValue;
      this.disabledDepositar = true;

      let discount = 1.0;
      let discountMountT = '0%';
      this.discountMount = discountMountT;

      switch (true) {
        case this.timeValueT == 3:
          this.discountMount = '5%';
          discount = 0.95;
          break;
        case this.timeValueT == 6:
          this.discountMount = '10%';
          discount = 0.90;
          break;
        case this.timeValueT == 12:
          this.discountMount = '25%';
          discount = 0.75;
          break;
      }

      this.calculatedAmount = planValue * timeValue * discount;
      if (this.dolarValue != null) {
        this.calculatedAmountSoles = planValue * timeValue * discount * this.dolarValue;

      }
      if (this.planValueT == 0 && this.timeValueT == 0) {
        this.calculatedAmount = null;
      } else if (this.calculatedAmount != 0) {
        this.disabledDepositar = false;
      }
    }
  }

  public getValorDolar() {
    this.response = this.transferservice.getValorDolar()
    this.response.subscribe((res: ResponseChangedDolar) => {
      if (res != null) {
        this.dolarValue = res.data.venta
      }
    });
  }

  activarCargadorImagen() {
    // Simula un clic en el input de archivo cuando se hace clic en el botón
    this.fileInput.nativeElement.click();
  }

  cargarImagen(event: any) {
    // Aquí puedes manejar la lógica para cargar la imagen
    const files = event.target.files;
    if (files && files.length > 0) {
      const imagenSeleccionada = files[0];
      this.transferservice.setImage(imagenSeleccionada, 'bryan');
      // Puedes realizar acciones adicionales según tus necesidades
      console.log('Imagen seleccionada:', imagenSeleccionada);
    }
  }

}
