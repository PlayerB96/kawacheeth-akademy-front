import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { BodyComponent } from './body/body.component';
import { DataTableComponent } from './data-table/data-table.component';
// DATATABLE
import { DataTablesModule } from "angular-datatables";
//HHTTP
import { HttpClientModule } from "@angular/common/http";
//FORMS
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LogindesignComponent } from './logindesign/logindesign.component';
import { BodyTComponent } from './body-t/body-t.component';
import { UpdateventComponent } from './data-table/updatevent/updatevent.component';
import { UpdateComponent } from './eventos/update/update.component';
import { CreateComponent } from './eventos/create/create.component';



@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    BodyComponent,
    DataTableComponent,
    LogindesignComponent,
    BodyTComponent,
    UpdateventComponent,
    UpdateComponent,
    CreateComponent
  ],
  imports: [
    BrowserModule,
    DataTablesModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
