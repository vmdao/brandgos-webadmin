import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  map,
  switchMap,
  catchError,
  withLatestFrom,
  concatMap
} from 'rxjs/operators';

import { ProductService } from './service';
import { ProductsActions } from './actions';

import { Store } from '@ngrx/store';
import * as fromBussiness from '.';
const {
  getProducts,
  getProductsFailure,
  getProductsSuccess,
  getProduct,
  getProductFailure,
  getProductSuccess,
  createProduct,
  createProductFailure,
  createProductSuccess,
  updateProduct,
  updateProductFailure,
  updateProductSuccess,
  deleteProduct,
  deleteProductFailure,
  deleteProductSuccess
} = ProductsActions;

@Injectable()
export class ProductEffects {
  constructor(
    private actions: Actions,
    private modelService: ProductService,
    private store$: Store<fromBussiness.ProductState>
  ) {}

  getList$ = createEffect(() =>
    this.actions.pipe(
      ofType(getProducts),
      switchMap(pramas => {
        return this.modelService.getAll(pramas.payload).pipe(
          map(payload => getProductsSuccess({ payload })),
          catchError(err => {
            console.error(err);
            return of(getProductsFailure());
          })
        );
      })
    )
  );

  getOne$ = createEffect(() =>
    this.actions.pipe(
      ofType(getProduct),
      switchMap(pramas => {
        return this.modelService.get(pramas.payload).pipe(
          map(payload => getProductSuccess({ payload })),
          catchError(err => {
            console.error(err);
            return of(getProductFailure());
          })
        );
      })
    )
  );

  create$ = createEffect(() =>
    this.actions.pipe(
      ofType(createProduct),
      switchMap(pramas => {
        return this.modelService.create(pramas.payload).pipe(
          map(payload => createProductSuccess({ payload })),
          catchError(err => {
            console.error(err);
            return of(createProductFailure({ payload: err }));
          })
        );
      })
    )
  );

  update$ = createEffect(() =>
    this.actions.pipe(
      ofType(updateProduct),
      switchMap(pramas => {
        return this.modelService.update(pramas.payload).pipe(
          map(payload => updateProductSuccess({ payload })),
          catchError(err => {
            console.error(err);
            return of(updateProductFailure({ payload: err }));
          })
        );
      })
    )
  );

  delete$ = createEffect(() =>
    this.actions.pipe(
      ofType(deleteProduct),
      switchMap(pramas => {
        return this.modelService.delete(pramas.payload).pipe(
          map(payload => deleteProductSuccess({ payload })),
          catchError(err => {
            console.error(err);
            return of(deleteProductFailure({ payload: err }));
          })
        );
      })
    )
  );

  changeSuccess$ = createEffect(() =>
    this.actions.pipe(
      ofType(deleteProductSuccess, updateProductSuccess, createProductSuccess),
      concatMap(action =>
        of(action).pipe(
          withLatestFrom(this.store$.select(fromBussiness.getProductsParams))
        )
      ),
      map(([action, params]) => {
        const payload = { ...params };
        return getProducts({ payload });
      })
    )
  );
}
