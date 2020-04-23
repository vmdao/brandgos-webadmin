import { createSelector } from '@ngrx/store';
import * as fromApp from '../reducers';
import * as fromProduct from './';

export const getProductState = createSelector(
  fromApp.selectContainerState,
  (state: fromApp.AppState) => state.products
);

export const getProducts = createSelector(
  getProductState,
  (state: fromProduct.ProductState) => state.list
);

export const getProduct = createSelector(
  getProductState,
  (state: fromProduct.ProductState) => state.item
);

export const getProductsPagination = createSelector(
  getProductState,
  (state: fromProduct.ProductState) => state.pagination
);

export const getProductsParams = createSelector(
  getProductState,
  (state: fromProduct.ProductState) => state.params
);

export const getProductsLoading = createSelector(
  getProductState,
  (state: fromProduct.ProductState) => state.loading
);

export const getProductView = createSelector(
  getProductState,
  (state: fromProduct.ProductState) => state.modal
);
