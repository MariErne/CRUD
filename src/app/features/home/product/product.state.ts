/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';
import { IProduct } from 'src/app/core/models/product.model';
import { ApiService } from 'src/app/core/services/api.service';

import {
  AddProductAction,
  GetAllProductsAction,
  DeleteProductAction,
  UpdateProductAction,
  SetSelectedProductAction,
} from './product.actions';

export interface IProductStateModel {
  products: IProduct[];
  selectedProduct: IProduct;
}
@State<IProductStateModel>({
  name: 'productList',
  defaults: {
    products: [],
    selectedProduct: null,
  },
})
@Injectable()
export class ProductState {
  constructor(private apiService: ApiService) {}

  @Selector()
  static getProductsList(state: IProductStateModel) {
    return state.products;
  }

  @Selector()
  static getSelectedProduct(state: IProductStateModel) {
    return state.selectedProduct;
  }
  @Action(AddProductAction)
  addProduct(
    { getState, patchState }: StateContext<IProductStateModel>,
    { payload }: AddProductAction,
  ) {
    return this.apiService.addProduct(payload).pipe(
      tap((result) => {
        const state = getState();
        patchState({
          products: [...state.products, result],
        });
      }),
    );
  }
  @Action(GetAllProductsAction)
  getAllProducts({ getState, setState }: StateContext<IProductStateModel>) {
    return this.apiService.getAllProducts().pipe(
      tap((result) => {
        const state = getState();
        setState({
          ...state,
          products: result,
        });
      }),
    );
  }
  @Action(DeleteProductAction)
  deleteProduct(
    { getState, setState }: StateContext<IProductStateModel>,
    { id }: DeleteProductAction,
  ) {
    return this.apiService.deleteProduct(id).pipe(
      tap((result) => {
        const state = getState();
        const filteredArray = state.products.filter((item) => item.id !== id);
        setState({
          ...state,
          products: filteredArray,
        });
      }),
    );
  }
  @Action(UpdateProductAction)
  updateProduct(
    { getState, setState }: StateContext<IProductStateModel>,
    { payload, id }: UpdateProductAction,
  ) {
    return this.apiService.updateProduct(payload, id).pipe(
      tap((result) => {
        const state = getState();
        const productList = [...state.products];
        const productIndex = productList.findIndex((item) => item.id === id);
        productList[productIndex] = result;
        setState({
          ...state,
          products: productList,
        });
      }),
    );
  }

  @Action(SetSelectedProductAction)
  setSelectedProduct(
    { getState, setState }: StateContext<IProductStateModel>,
    { payload }: SetSelectedProductAction,
  ) {
    const state = getState();
    setState({
      ...state,
      selectedProduct: payload,
    });
  }
}
