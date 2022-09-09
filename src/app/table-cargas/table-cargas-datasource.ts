import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface TableCargasItem {
  id: number;
  placa: string;
  cargado: string;
  local: string;
  horacarga: string;
  horalimite: string;
  tipo: string;
  estado: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: TableCargasItem[] = [
  {id: 1, placa: 'XXV12', cargado:'Sí', local:'H1', horacarga:'5:00', horalimite:'5:10', tipo:'EXCLUSIVO', estado: 'Sí'},
  {id: 2, placa: 'BAG12', cargado:'No', local:'H2', horacarga:'8:00', horalimite:'7:50', tipo:'EXCLUSIVO', estado: 'Sí'},
  {id: 3, placa: 'ZGAG5', cargado:'Sí', local:'H3', horacarga:'15:00', horalimite:'15:00', tipo:'EXCLUSIVO', estado: 'No'},
  {id: 4, placa: 'HHG55', cargado:'No', local:'H4', horacarga:'11:00', horalimite:'10:50', tipo:'EXCLUSIVO', estado: 'No'},
  {id: 5, placa: 'ZBB12', cargado:'Sí', local:'H1', horacarga:'10:00', horalimite:'10:10', tipo:'EXCLUSIVO', estado: 'Sí'},
  {id: 6, placa: 'BBBA2', cargado:'Sí', local:'H1', horacarga:'8:00', horalimite:'8:10', tipo:'EXCLUSIVO', estado: 'No'},
];

/**
 * Data source for the TableCargas view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TableCargasDataSource extends DataSource<TableCargasItem> {
  data: TableCargasItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<TableCargasItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: TableCargasItem[]): TableCargasItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: TableCargasItem[]): TableCargasItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'placa': return compare(+a.placa, +b.placa, isAsc);
        case 'cargado': return compare(a.cargado, b.cargado, isAsc);
        case 'local': return compare(+a.local, +b.local, isAsc);
        case 'horacarga': return compare(a.horacarga, b.horacarga, isAsc);
        case 'horalimite': return compare(+a.horalimite, +b.horalimite, isAsc);
        case 'tipo': return compare(a.tipo, b.tipo, isAsc);
        case 'estado': return compare(+a.estado, +b.estado, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
