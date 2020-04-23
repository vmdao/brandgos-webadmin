import { createAction, props } from '@ngrx/store';

import { ProductModel } from './model';
import { ProductResultsModel, ProductResultModel } from './results.model';

const getProducts = createAction(
  '[PRODUCT] Get Products',
  props<{ payload: any }>()
);

const getProductsSuccess = createAction(
  '[PRODUCT] Get Products Success',
  props<{ payload: ProductResultsModel }>()
);

export const getProductsFailure = createAction('[PRODUCT] Get Products Faild');

const getProduct = createAction(
  '[PRODUCT] Get Product',
  props<{ payload: any }>()
);

const getProductSuccess = createAction(
  '[PRODUCT] Get Product Success',
  props<{ payload: ProductResultModel }>()
);

export const getProductFailure = createAction('[PRODUCT] Get Product Faild');

const createProduct = createAction(
  '[PRODUCT] Create Product',
  props<{ payload: ProductModel }>()
);

const createProductSuccess = createAction(
  '[PRODUCT] Create Product Success',
  props<{ payload: ProductResultModel }>()
);

export const createProductFailure = createAction(
  '[PRODUCT] Create Product Faild',
  props<{ payload: ProductResultModel }>()
);

const updateProduct = createAction(
  '[PRODUCT] Update Product',
  props<{ payload: ProductModel }>()
);

const updateProductSuccess = createAction(
  '[PRODUCT] Update Product Success',
  props<{ payload: ProductResultModel }>()
);

export const updateProductFailure = createAction(
  '[PRODUCT] Update Product Faild',
  props<{ payload: ProductResultModel }>()
);

const deleteProduct = createAction(
  '[PRODUCT] Delete Product',
  props<{ payload: number }>()
);

const deleteProductSuccess = createAction(
  '[PRODUCT] Delete Product Success',
  props<{ payload: ProductResultModel }>()
);

export const deleteProductFailure = createAction(
  '[PRODUCT] Delete Product Faild',
  props<{ payload: ProductResultModel }>()
);
export const openProductView = createAction('[PRODUCT] Open Product View');

export const ProductsActions = {
  openProductView,
  getProducts,
  getProductsSuccess,
  getProductsFailure,
  getProduct,
  getProductSuccess,
  getProductFailure,
  createProduct,
  createProductSuccess,
  createProductFailure,
  updateProduct,
  updateProductSuccess,
  updateProductFailure,
  deleteProduct,
  deleteProductSuccess,
  deleteProductFailure,
};
