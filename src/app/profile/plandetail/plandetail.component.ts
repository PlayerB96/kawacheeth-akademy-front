import { Component, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-plandetail',
  templateUrl: './plandetail.component.html',
  styleUrls: ['./plandetail.component.scss'],
})
export class PlandetailComponent implements OnInit {
  constructor(private profileservice: ProfileService) {}

  ngOnInit(): void {}
  redirectTransferProfile(codeRedirect: string): void {
    // this.modalService.cerrarModal(typeStateModal)
    console.log(codeRedirect);
    this.profileservice.redirectTransferProfile(codeRedirect);
  }
}
