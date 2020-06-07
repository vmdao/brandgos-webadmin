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

import { ItemService } from './service';
import { ItemsActions } from './actions';

import { Store } from '@ngrx/store';
import * as fromBussiness from '.';
const {
  getItems,
  getItemsFailure,
  getItemsSuccess,
  getItem,
  getItemFailure,
  getItemSuccess,
  createItem,
  createItemFailure,
  createItemSuccess,
  updateItem,
  updateItemFailure,
  updateItemSuccess,
  deleteItem,
  deleteItemFailure,
  deleteItemSuccess
} = ItemsActions;

@Injectable()
export class ItemEffects {
  constructor(
    private actions: Actions,
    private modelService: ItemService,
    private store$: Store<fromBussiness.ItemState>
  ) {}

  getList$ = createEffect(() =>
    this.actions.pipe(
      ofType(getItems),
      switchMap(pramas => {
        return this.modelService.getAll(pramas.payload).pipe(
          map(payload => getItemsSuccess({ payload })),
          catchError(err => {
            console.error(err);
            return of(getItemsFailure());
          })
        );
      })
    )
  );

  getOne$ = createEffect(() =>
    this.actions.pipe(
      ofType(getItem),
      switchMap(pramas => {
        return this.modelService.get(pramas.payload).pipe(
          map(payload => getItemSuccess({ payload })),
          catchError(err => {
            console.error(err);
            return of(getItemFailure());
          })
        );
      })
    )
  );

  create$ = createEffect(() =>
    this.actions.pipe(
      ofType(createItem),
      switchMap(pramas => {
        return this.modelService.create(pramas.payload).pipe(
          map(payload => createItemSuccess({ payload })),
          catchError(err => {
            console.error(err);
            return of(createItemFailure({ payload: err }));
          })
        );
      })
    )
  );

  update$ = createEffect(() =>
    this.actions.pipe(
      ofType(updateItem),
      switchMap(pramas => {
        return this.modelService.update(pramas.payload).pipe(
          map(payload => updateItemSuccess({ payload })),
          catchError(err => {
            console.error(err);
            return of(updateItemFailure({ payload: err }));
          })
        );
      })
    )
  );

  delete$ = createEffect(() =>
    this.actions.pipe(
      ofType(deleteItem),
      switchMap(pramas => {
        return this.modelService.delete(pramas.payload).pipe(
          map(payload => deleteItemSuccess({ payload })),
          catchError(err => {
            console.error(err);
            return of(deleteItemFailure({ payload: err }));
          })
        );
      })
    )
  );

  changeSuccess$ = createEffect(() =>
    this.actions.pipe(
      ofType(deleteItemSuccess, updateItemSuccess, createItemSuccess),
      concatMap(action =>
        of(action).pipe(
          withLatestFrom(this.store$.select(fromBussiness.getItemsParams))
        )
      ),
      map(([action, params]) => {
        const payload = { ...params };
        return getItems({ payload });
      })
    )
  );
}
