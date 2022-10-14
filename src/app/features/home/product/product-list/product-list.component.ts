/* eslint-disable no-alert */
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Select, Store } from '@ngxs/store';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IProduct } from 'src/app/core/models/product.model';
import { ApiService } from 'src/app/core/services/api.service';
import {
  DeleteProductAction,
  GetAllProductsAction,
} from 'src/app/features/home/product/product.actions';
import { ProductState } from 'src/app/features/home/product/product.state';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  private readonly destroy$: Subject<boolean> = new Subject();
  displayedColumns: string[] = [
    'productName',
    'category',
    'date',
    'freshness',
    'price',
    'comment',
    'action',
  ];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Select(ProductState.getProductsList) products: Observable<IProduct[]>;
  @Select(ProductState.getSelectedProduct) selectedProduct: Observable<IProduct>;
  private initValue$: BehaviorSubject<IProduct[]> = new BehaviorSubject<IProduct[]>([]);
  constructor(private dialog: MatDialog, private apiService: ApiService, private store: Store) {}

  ngOnInit() {
    this.getAllProducts();
    this.store.dispatch(new GetAllProductsAction());
    // this.dataSource.data.includes(this.products);

    // this.dataSource.filterPredicate = (data: IProduct, filter: any) =>
    //   data.productName.indexOf(filter) !== -1;
    // this.dataSource.filterPredicate = function customFilter(data, filter: string): boolean {
    //   return data.startsWith(filter);
    // };
  }

  getAllProducts() {
    this.apiService.getAllProducts().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: () => {
        alert('Error while fetching the Products!');
      },
    });
  }

  deleteProduct(id: number) {
    console.log('Deleted id: ', id);
    this.store.dispatch(new DeleteProductAction(id));
  }

  updateProduct(payload: IProduct) {
    this.dialog
      .open(DialogComponent, { width: '30%', data: payload })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'update') {
          this.store.dispatch(new GetAllProductsAction());
        }
      });
  }

  // filterProduct(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }
  //  this.dataSource.filterPredicate = (data:
  //   IProduct, filterValue: any) =>
  //   data.trim().toLowerCase().indexOf(filterValue) !== -1;

  // applyFilter(filterValue: string) {
  //     this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  filterProduct(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
