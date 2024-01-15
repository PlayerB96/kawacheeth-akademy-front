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
    private profileservice: ProfileService
  ) {}

  ngOnInit(): void {}
  cerrarModal(typeStateModal: string) {
    this.modalService.cerrarModal(typeStateModal);
  }
}
