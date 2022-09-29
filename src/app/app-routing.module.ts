import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './body/body.component';
import { DataTableComponent } from './data-table/data-table.component';
import { CreateComponent } from './eventos/create/create.component';
import { UpdateComponent } from './eventos/update/update.component';
import { LogindesignComponent } from './logindesign/logindesign.component';
import { AuthGuard } from './shared/auth.guard';



const routes: Routes = [


  { path: 'login', component: LogindesignComponent},
  { path: '', component: BodyComponent, canActivate: [AuthGuard],
          children: [
             { path: 'alertas', component: DataTableComponent, pathMatch: 'full'},
             { path: 'update', component: UpdateComponent, pathMatch: 'full'},
             { path: 'create', component: CreateComponent, pathMatch: 'full'}
          ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
