import { Injectable } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalsTransferencialocalComponent } from '../modals-transferencialocal/modals-transferencialocal.component';
import { ModalsHistorialComponent } from '../modals-historial/modals-historial.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modalRefTransferenciaLocal: MdbModalRef<ModalsTransferencialocalComponent> | undefined;
  modalRefHistorial: MdbModalRef<ModalsHistorialComponent> | undefined;

  constructor(private modalService: MdbModalService) { }

  public abrirModal(typeStateModal: string, banco: string, ncuenta: string, estado_suscripcion: boolean, metodPayment: string, account: string) {

    switch (typeStateModal) {
      case 'transferencia-local':
        this.modalRefTransferenciaLocal = this.modalService.open(ModalsTransferencialocalComponent);
        this.modalRefTransferenciaLocal.component.bancoLocal = banco
        this.modalRefTransferenciaLocal.component.numeroCuenta = ncuenta
        break;
      case 'historial':
        this.modalRefHistorial = this.modalService.open(ModalsHistorialComponent);
        this.modalRefHistorial.component.stateSuscription = estado_suscripcion
        this.modalRefHistorial.component.metodoPago = metodPayment
        this.modalRefHistorial.component.cuenta = account


        break;
      default:
        console.log('Sin Modal');
    }
  }


  public cerrarModalTransfer(typeStateModal: string) {

    switch (typeStateModal) {

      case 'transferencia-local':
        if (this.modalRefTransferenciaLocal) {
          this.modalRefTransferenciaLocal.close();
        } break;
      default:
        console.log('Sin Modal');
    }

  }

}
