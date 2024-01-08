import { Injectable } from '@angular/core';
import { ValidateProgressComponent } from '../models-validateProgress/validate-progress.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modalRefValidationProgress: MdbModalRef<ValidateProgressComponent> | undefined;
  codigo: string = '';
  nivel: string = '';

  constructor(private modalService: MdbModalService) { }

  public abrirModal(typeStateModal: string, selectedOption: any) {

    switch (typeStateModal) {
      case 'validate-progress':
        this.modalRefValidationProgress = this.modalService.open(ValidateProgressComponent);
        switch (selectedOption.code) {
          case '0001':
          case '0002':
          case '0003':
            this.nivel = 'Nivel 1';
            break;
          // Agrega más casos según sea necesario
          default:
            // Código para manejar el caso por defecto (si es necesario)
            break;
          case '0004':
          case '0005':
          case '0006':
            this.nivel = 'Nivel 2'
            break;
        }

        this.modalRefValidationProgress.component.nivelActividad = this.nivel

        this.modalRefValidationProgress.component.nombreActividad = selectedOption.name
        break;

        break;
      default:
        console.log('Sin Modal');
    }
  }


  public cerrarModalValidationProgress(typeStateModal: string) {

    switch (typeStateModal) {

      case 'transferencia-local':
        if (this.modalRefValidationProgress) {
          this.modalRefValidationProgress.close();
        } break;
      default:
        console.log('Sin Modal');
    }

  }
}
