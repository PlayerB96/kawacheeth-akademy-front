import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { BodyComponent } from './body/body.component';
// DATATABLE
import { DataTablesModule } from "angular-datatables";
//HHTTP
import { HttpClientModule } from "@angular/common/http";
//FORMS
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LogindesignComponent } from './logindesign/logindesign.component';
import { BodyTComponent } from './body-t/body-t.component';
import { MatButtonModule } from '@angular/material/button';
import { ToastrModule } from 'ngx-toastr';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { InviteComponent } from './invite/invite.component';


@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],

  declarations: [
    AppComponent,
    SidenavComponent,
    BodyComponent,
    LogindesignComponent,
    BodyTComponent,
    ProfileComponent,
    DashboardComponent,
    HomeComponent,
    RegisterComponent,
    InviteComponent,

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
    MatButtonModule,
    ToastrModule.forRoot()

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
