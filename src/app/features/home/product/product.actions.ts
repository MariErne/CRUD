/* eslint-disable max-classes-per-file */
import { IProduct } from '../../../core/models/product.model';

export class GetAllProductsAction {
  static readonly type = '[Product] Get All Products';
}

export class GetProductAction {
  static readonly type = '[Product] Get Product';

  constructor(public payload: IProduct, public id: number) {}
}

export class AddProductAction {
  static readonly type = '[Product] Add Product';

  constructor(public payload: IProduct) {}
}

export class UpdateProductAction {
  static readonly type = '[Product] Update Product';

  constructor(public payload: IProduct, public id: number) {}
}

export class DeleteProductAction {
  static readonly type = '[Product] Delete Product';

  constructor(public id: number) {}
}

export class SetSelectedProductAction {
  static readonly type = '[Product] Set';

  constructor(public payload: IProduct) {}
}
