import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface TableEntregasItem {
  id: number;
  placa: string;
  ubication: string;
  detenido: string;
  rutapendiente: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: TableEntregasItem[] = [
  {id: 1, placa: 'XXV12', ubication:'Av.Trinidad Moran', detenido: 'Sí', rutapendiente: 'Ruta1'},
  {id: 2, placa: 'BAG12', ubication:'Av.Arenales 12516', detenido: 'Sí', rutapendiente: 'Ruta2'},
  {id: 3, placa: 'ZGAG5', ubication:'Jr.Lithium Moran', detenido: 'No', rutapendiente: 'Ruta3'},
  {id: 4, placa: 'HHG55', ubication:'Av.Beryllium Moran', detenido: 'No', rutapendiente: 'Ruta4'},
  {id: 5, placa: 'ZBB12', ubication:'Av.Boron Moran', detenido: 'Sí', rutapendiente: 'Ruta5'},
  {id: 6, placa: 'BBBA2', ubication:'Av.Carbon Moran', detenido: 'No', rutapendiente: 'Ruta6'},
];

/**
 * Data source for the TableEntregas view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TableEntregasDataSource extends DataSource<TableEntregasItem> {
  data: TableEntregasItem[] = EXAMPLE_DATA;
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
  connect(): Observable<TableEntregasItem[]> {
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
  private getPagedData(data: TableEntregasItem[]): TableEntregasItem[] {
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
  private getSortedData(data: TableEntregasItem[]): TableEntregasItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'placa': return compare(a.placa, b.placa, isAsc);
        case 'ubication': return compare(a.ubication, b.ubication, isAsc);
        case 'detenido': return compare(+a.detenido, +b.detenido, isAsc);
        case 'rutapendiente': return compare(+a.rutapendiente, +b.rutapendiente, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
