import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableCargasComponent } from './table-cargas/table-cargas.component';
import { TableEntregasComponent } from './table-entregas/table-entregas.component';



const routes: Routes = [
  {path: '', redirectTo:'carga', pathMatch: 'full'},
  {path: 'carga', component: TableCargasComponent},
  {path: 'entrega', component: TableEntregasComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
