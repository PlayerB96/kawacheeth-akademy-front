import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { DataTablesModule } from 'angular-datatables';
//HHTTP
import { HttpClientModule } from '@angular/common/http';
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
import { MatMenuModule } from '@angular/material/menu';

import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbModalModule, MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ModalsComponent } from './profile/modals-progress/modals.component';
import { ProgressComponent } from './progress/progress.component';
import { TransferComponent } from './transfer/transfer.component';
import { ModalsTransferencialocalComponent } from './transfer/modals-transferencialocal/modals-transferencialocal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ModalsHistorialComponent } from './transfer/modals-historial/modals-historial.component';
import { ReportPaymentComponent } from './report-payment/report-payment.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatChipsModule } from '@angular/material/chips';
import { ValidationActivitiesComponent } from './validation-activities/validation-activities.component';
import { MatInputModule } from '@angular/material/input';
import { DatePipe } from '@angular/common';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { ValidateProgressComponent } from './progress/models-validateProgress/validate-progress.component';
import { ModalsCtokensComponent } from './dashboard/modals-ctokens/modals-ctokens.component';
import { PlandetailComponent } from './profile/plandetail/plandetail.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { FooterComponent } from './body-t/footer/footer.component';
// import { JwtModule } from '@auth0/angular-jwt';
// export function tokenGetter() {
//   return localStorage.getItem("token");
// }
@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

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
    ModalsComponent,
    ProgressComponent,
    TransferComponent,
    ModalsTransferencialocalComponent,
    ModalsHistorialComponent,
    ReportPaymentComponent,
    ValidationActivitiesComponent,
    ValidateProgressComponent,
    ModalsCtokensComponent,
    PlandetailComponent,
    ConfirmationDialogComponent,
    FooterComponent,
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
    ToastrModule.forRoot(),
    MdbCheckboxModule,
    MdbModalModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatButtonModule,
    MatChipsModule,
    DatePipe,
    MatMenuModule,
    MatDialogModule,
    // JwtModule.forRoot({
    //   config: {
    //     tokenGetter: tokenGetter,
    //     allowedDomains: ["localhost:8000"],
    //     disallowedRoutes: ["http://localhost:8000/api/token/refresh/"],
    //   },
    // }),
  ],

  providers: [DatePipe, { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
