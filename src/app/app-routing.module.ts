import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './body/body.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LogindesignComponent } from './logindesign/logindesign.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './shared/auth.guard';
import { RegisterComponent } from './register/register.component';
import { InviteComponent } from './invite/invite.component';
import { ProgressComponent } from './progress/progress.component';
import { TransferComponent } from './transfer/transfer.component';
import { ReportPaymentComponent } from './report-payment/report-payment.component';
import { ValidationActivitiesComponent } from './validation-activities/validation-activities.component';
import { PlandetailComponent } from './profile/plandetail/plandetail.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LogindesignComponent },
  { path: '', component: LogindesignComponent },

  {
    path: '',
    component: BodyComponent,
    canActivate: [AuthGuard],

    children: [
      { path: 'profile', component: ProfileComponent, pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, pathMatch: 'full' },
      { path: 'home', component: HomeComponent, pathMatch: 'full' },
      {
        path: 'profile/progress',
        component: ProgressComponent,
        pathMatch: 'full',
      },
      {
        path: 'profile/transfer',
        component: TransferComponent,
        pathMatch: 'full',
      },
      {
        path: 'profile/plan',
        component: PlandetailComponent,
        pathMatch: 'full',
      },
      {
        path: 'dashboard/invite',
        component: InviteComponent,
        pathMatch: 'full',
      },
      {
        path: 'reportPayment',
        component: ReportPaymentComponent,
        pathMatch: 'full',
      },
      {
        path: 'reportValidation',
        component: ValidationActivitiesComponent,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
