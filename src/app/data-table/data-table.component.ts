import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { AlertInt, ReqResponse } from './modelos/req-resp';
import { LanguageApp } from './data-table.language';
import { ApiServiceTableService } from './services/api.service.table.service';
import { LoginservicesService } from '../logindesign/services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnDestroy, OnInit {
  public alerts: any = [];
  public alert: any = {};
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  public id: any;
  editing: boolean = false;

  constructor(
    private service: ApiServiceTableService,
    private loginservice: LoginservicesService,
    private activatedRouter: ActivatedRoute,
    private route: Router,
    private toastr: ToastrService
  ) {
    this.id = this.activatedRouter.snapshot.params['id'];

    // if (this.id) {
    //   this.editing = true;
    //   this.service.getAlerts().subscribe((alert) => {
    //     this.alerts = alert;
    //     this.alert.this.alert.find((m: any) => {
    //       return m.id == this.id;
    //     });
    //   });
    // } else {
    //   this.editing = false;
    // }
  }

  @Output()
  emitter = new Subject<any>();

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthMenu: [10, 15, 50],
      language: LanguageApp.spanish_datatables,
      processing: true,
    };

    this.getAlerts();
  }

  async getAlerts() {
    this.service.getAlerts().subscribe({
      next: (alert: any) => {
        this.alerts = alert.data;
        console.log(this.alerts.data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  public editar(i: any) {
    console.log('prueba1');
    this.emitter.next({
      cmd: 'action1',
      data: this.alerts,
    });
    console.log(this.id);
    console.log(this.alerts[i].descripcion);
  }


  deleteAlert(alert: any) {
    this.service.deleteAlerts(alert.id).subscribe({
      next: (alert) => {
        var resultData = alert.data;

        if (resultData != null && resultData.status) {
          this.toastr.success(resultData.message);
          this.getAlerts();
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  AddEmployee() {
    this.route.navigate(['create']);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  onLogout(): void {
    this.loginservice.logout();
  }
}
