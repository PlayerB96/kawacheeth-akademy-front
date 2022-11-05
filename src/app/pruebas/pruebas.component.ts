import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { filter, Subject } from 'rxjs';
import { LanguageApp } from '../data-table/data-table.language';
import { ApiServiceTableService } from '../data-table/services/api.service.table.service';
import { LoginservicesService } from '../logindesign/services/login.service';

@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas.component.html',
  styleUrls: ['./pruebas.component.scss']
})
export class PruebasComponent implements OnInit {
  routerSubscription: any;
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

  }

  @Output()
  emitter = new Subject<any>();

  ngOnInit(): void {
    this.recallJsFuntions();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 15, 50],
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

  recallJsFuntions() {
    this.routerSubscription = this.route.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        $.getScript('./datatable.js');
        console.log("hola")
      });

  }



}
