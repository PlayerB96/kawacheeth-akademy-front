import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataTableComponent } from './data-table/data-table.component';
import { LoginComponent } from './login/login.component';



const routes: Routes = [
  {path: '', redirectTo:'carga', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'alertas', component: DataTableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
