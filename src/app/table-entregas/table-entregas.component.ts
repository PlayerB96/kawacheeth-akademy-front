import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { TableEntregasDataSource, TableEntregasItem } from './table-entregas-datasource';

@Component({
  selector: 'app-table-entregas',
  templateUrl: './table-entregas.component.html',
  styleUrls: ['./table-entregas.component.scss']
})
export class TableEntregasComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TableEntregasItem>;
  dataSource: TableEntregasDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'placa', 'ubication', 'detenido', 'rutapendiente'];

  constructor() {
    this.dataSource = new TableEntregasDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
