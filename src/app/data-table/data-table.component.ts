import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ReqResponse } from './modelos/req-resp';
import { LanguageApp } from './data-table.language';
import { ApiServiceTableService } from './services/api.service.table.service';
import { LoginservicesService } from '../logindesign/services/login.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements  OnDestroy, OnInit {


  public alerts: any = []
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  constructor(private service: ApiServiceTableService, private loginservice: LoginservicesService) {}

  ngOnInit(): void {
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10,
        lengthMenu: [10,15,50],
        language: LanguageApp.spanish_datatables,
        processing: true
      }

      this.service.getAlerts()
      .subscribe( (alert) => {
        this.alerts= alert;
      });

  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  onLogout(): void{
      this.loginservice.logout();
  }

}
