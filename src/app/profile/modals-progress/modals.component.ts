import { Component, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { ListActivities } from '../models/response.interface';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.scss']
})
export class ModalsComponent implements OnInit {
  list_Activities: ListActivities[] | null = null

  constructor(private modalService: ModalService, private profileservice: ProfileService) { }

  ngOnInit(): void {
    this.list_Activities = this.modalService.list_Activities

  }
  cerrarModal(typeStateModal: string) {
    this.modalService.cerrarModal(typeStateModal)
  }

  redirectProgress(typeStateModal: string): void {
    this.modalService.cerrarModal(typeStateModal)

    this.profileservice.redirectProgress();

  }
}
