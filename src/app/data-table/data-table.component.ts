import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ReqResponse } from './modelos/req-resp';
import { LanguageApp } from './data-table.language';
import { ApiServiceTableService } from './services/api.service.table.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements  OnDestroy, OnInit {


  public alerts: any = []
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  constructor(private service: ApiServiceTableService) {}

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
        // this.dtTrigger.next(true);
      });

  }
  ngOnDestroy(): void {

    this.dtTrigger.unsubscribe();
  }

  // ngOnInit(): void {
  //   this.users();
  // }

  // users(): void {

  //   this.service
  //       .users()
  //       .subscribe((response: any) => {
  //         this.allUsers = response.data;
  //         console.log(response.data)
  //       });
  // }
}
