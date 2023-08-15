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
      { path: 'dashboard/invite', component: InviteComponent, pathMatch: 'full' },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }