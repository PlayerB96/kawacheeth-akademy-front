import { Component, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-modals-upgrade',
  templateUrl: './modals-upgrade.component.html',
  styleUrls: ['./modals-upgrade.component.scss'],
})
export class ModalsUpgradeComponent implements OnInit {
  constructor(
    private modalService: ModalService,
    private profileservice: ProfileService
  ) {}

  ngOnInit(): void {}
  cerrarModal(typeStateModal: string) {
    this.modalService.cerrarModal(typeStateModal);
  }

  redirectTransfer(typeStateModal: string): void {
    this.modalService.cerrarModal(typeStateModal);
    this.profileservice.redirectTransfer();
  }

  redirectPlan(typeStateModal: string): void {
    this.modalService.cerrarModal(typeStateModal);
    this.profileservice.redirectPlan();
  }
}
