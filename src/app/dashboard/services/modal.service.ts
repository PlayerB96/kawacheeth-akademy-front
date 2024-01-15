import { Injectable } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalsUpgradeComponent } from 'src/app/profile/modals-upgrade/modals-upgrade.component';
import { ModalsTransferencialocalComponent } from 'src/app/transfer/modals-transferencialocal/modals-transferencialocal.component';
import { ModalsCtokensComponent } from '../modals-ctokens/modals-ctokens.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  modalRef: MdbModalRef<ModalsCtokensComponent> | undefined;
  modalRefUp: MdbModalRef<ModalsUpgradeComponent> | undefined;
  modalRefTransferenciaLocal:
    | MdbModalRef<ModalsTransferencialocalComponent>
    | undefined;

  constructor(private modalService: MdbModalService) {}

  public abrirModal(typeStateModal: string) {
    switch (typeStateModal) {
      case 'ctokens':
        this.modalRef = this.modalService.open(ModalsCtokensComponent);
        break;
    }
  }

  public cerrarModal(typeStateModal: string) {
    switch (typeStateModal) {
      case 'ctokens':
        if (this.modalRef) {
          this.modalRef.close();
        }
        break;
    }
  }
}
