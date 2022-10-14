/* eslint-disable no-alert */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, Inject, OnChanges, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { IProduct } from 'src/app/core/models/product.model';
import { ApiService } from 'src/app/core/services/api.service';
import {
  AddProductAction,
  GetAllProductsAction,
  UpdateProductAction,
} from 'src/app/features/home/product/product.actions';
import { ProductState } from 'src/app/features/home/product/product.state';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  private readonly destroy$: Subject<boolean> = new Subject();
  freshnessList = ['Brand New', 'Second Hand', 'Refurbished'];
  productForm!: FormGroup;
  actionBtn: string = 'Save';
  maxDate: string = new Date(new Date().setHours(0, 0, 0, 0)).toISOString();
  @Select(ProductState.getSelectedProduct) selectedProduct: Observable<IProduct>;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>,
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    if (this.editData) {
      this.selectedProduct.subscribe(() => {
        this.productForm.patchValue({
          productName: this.editData.productName,
          category: this.editData.category,
          date: this.editData.date,
          freshness: this.editData.freshness,
          price: this.editData.price,
          comment: this.editData.comment,
        });
        this.actionBtn = 'Update';
      });
    } else {
      this.actionBtn = 'Save';
    }
  }

  createForm() {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', null],
      date: ['', Validators.required],
    });
  }
  onSubmit(payload: IProduct) {
    if (!this.editData) {
      if (this.productForm.valid) {
        this.store.dispatch(new AddProductAction(this.productForm.value)).subscribe({
          next: (res) => {
            this.productForm.reset();
            this.dialogRef.close('save');
            this.store.dispatch(new GetAllProductsAction());
          },
          error: () => {
            alert('Error while adding the product');
          },
        });
      }
    } else {
      this.store
        .dispatch(new UpdateProductAction(this.productForm.value, this.editData.id))
        .subscribe({
          next: (res) => {
            this.dialogRef.close('update');
            this.productForm.reset();
            this.store.dispatch(new GetAllProductsAction());
          },
          error: () => {
            alert('Error while updating the product!');
          },
        });
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
