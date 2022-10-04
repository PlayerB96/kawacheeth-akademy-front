import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
// import { ToastrService } from 'ngx-toastr';
// import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceTableService } from 'src/app/data-table/services/api.service.table.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit {
  editAlertForm: alertForm = new alertForm();

  @ViewChild('alertForm')
  alertForm!: NgForm;

  isSubmitted: boolean = false;
  alertId: any;

  public alerts: any = [];
  constructor(
    // private toastr: ToastrService,
    // private route: ActivatedRoute,
    // private router: Router,
    private service: ApiServiceTableService
  ) {}

  ngOnInit(): void {
    // this.alertForm = this.route.snapshot.params['alertForm'];
    // this.getAlertDetailById();
    this.getAlerts();

  }

  public getAlerts() {
    this.service.getAlerts().subscribe({
      next: (alert) => {
        if (alert != null && alert.data != null) {
          this.alerts = alert.data;
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  public getAlertDetailById() {
    this.service.getAlertDetailById(this.alertForm).subscribe({
      next: (alert) => {
        if (alert != null && alert.data != null) {
          var resultData = alert.data;
          if (resultData) {
            this.editAlertForm.Id = resultData.id;
            this.editAlertForm.descripcion = resultData.descripcion;
            this.editAlertForm.estado = resultData.estado;
            this.editAlertForm.evento = resultData.evento;
            this.editAlertForm.placa = resultData.placa;
          }
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  public updateAlert(): void {
    console.log(this.alerts);
  }
}
export class alertForm {
  Id: number = 0;
  descripcion: string = '';
  placa: string = '';
  estado: string = '';
  evento: string = '';
}
