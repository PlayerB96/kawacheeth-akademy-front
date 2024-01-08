import { Injectable } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalsComponent } from '../modals-progress/modals.component';
import { ModalsUpgradeComponent } from '../modals-upgrade/modals-upgrade.component';
import { ListActivities } from '../models/response.interface';
import { ModalsTransferencialocalComponent } from 'src/app/transfer/modals-transferencialocal/modals-transferencialocal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  modalRef: MdbModalRef<ModalsComponent> | undefined;
  modalRefUp: MdbModalRef<ModalsUpgradeComponent> | undefined;
  modalRefTransferenciaLocal: MdbModalRef<ModalsTransferencialocalComponent> | undefined;

  list_Activities: ListActivities[] | null = null

  constructor(private modalService: MdbModalService) { }

  public abrirModal(typeStateModal: string, list_activities: ListActivities[]) {

    this.list_Activities = list_activities
    switch (typeStateModal) {
      case 'progress':
        this.modalRef = this.modalService.open(ModalsComponent);
        break;
      case 'upgrade':
        this.modalRefUp = this.modalService.open(ModalsUpgradeComponent);
        break;
      case 'validateProgress':
        this.modalRefUp = this.modalService.open(ModalsUpgradeComponent);
        break;
      default:
        console.log('Sin Modal');
    }
  }

  public cerrarModal(typeStateModal: string) {

    switch (typeStateModal) {
      case 'progress':
        if (this.modalRef) {
          this.modalRef.close();
        }
        break;
      case 'upgrade':
        if (this.modalRefUp) {
          this.modalRefUp.close();
        } break;
      default:
        console.log('Sin Modal');
    }

  }

}
