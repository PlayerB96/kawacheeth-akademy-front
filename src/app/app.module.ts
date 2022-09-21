import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { DashComponent } from './dash/dash.component';
import { TableCargasComponent } from './table-cargas/table-cargas.component';
import { BodyComponent } from './body/body.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TablePruebaComponent } from './table-prueba/table-prueba.component';
import { DataTableComponent } from './data-table/data-table.component';
// DATATABLE
import { DataTablesModule } from "angular-datatables";

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    DashComponent,
    TableCargasComponent,
    BodyComponent,
    NavbarComponent,
    TablePruebaComponent,
    DataTableComponent
  ],
  imports: [
    BrowserModule,
    DataTablesModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
