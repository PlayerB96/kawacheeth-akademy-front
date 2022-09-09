import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { TableCargasDataSource, TableCargasItem } from './table-cargas-datasource';

@Component({
  selector: 'app-table-cargas',
  templateUrl: './table-cargas.component.html',
  styleUrls: ['./table-cargas.component.scss']
})
export class TableCargasComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TableCargasItem>;
  dataSource: TableCargasDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'placa', 'cargado', 'local', 'horacarga', 'horalimite', 'tipo', 'estado'];

  constructor() {
    this.dataSource = new TableCargasDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
