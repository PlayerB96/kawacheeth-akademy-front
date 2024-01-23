import { Component, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { ProfileService } from 'src/app/profile/services/profile.service';

@Component({
  selector: 'app-modals-ctokens',
  templateUrl: './modals-ctokens.component.html',
  styleUrls: ['./modals-ctokens.component.scss'],
})
export class ModalsCtokensComponent implements OnInit {
  constructor(
    private modalService: ModalService,
  ) { }
  selectedOptionPlan: string = '0';
  calculatedAmount: number | null = null;
  planValue: number | null = null;
  disabledDepositar: boolean | null = null;

  ngOnInit(): void {
    this.disabledDepositar = true;

  }
  cerrarModal(typeStateModal: string) {
    this.modalService.cerrarModal(typeStateModal);
  }

  calculateAmount() {
    if (this.selectedOptionPlan) {
      let discount = 0.5;
      this.planValue = parseFloat(this.selectedOptionPlan.toString());
      this.calculatedAmount = this.planValue * discount;

      if (this.planValue == 500) {
        this.planValue = this.planValue + 50
      } else if (this.planValue == 1000) {
        this.planValue = this.planValue + 100

      }

    }

    if (this.planValue == 0) {
      this.calculatedAmount = null;
      this.disabledDepositar = true;

    } else if (this.calculatedAmount != 0) {
      this.disabledDepositar = false;
    }
  }
}
