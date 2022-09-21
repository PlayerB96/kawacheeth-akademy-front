import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataTableComponent } from './data-table/data-table.component';
import { TableCargasComponent } from './table-cargas/table-cargas.component';



const routes: Routes = [
  {path: '', redirectTo:'carga', pathMatch: 'full'},
  {path: 'carga', component: TableCargasComponent},
  {path: 'entrega', component: DataTableComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
