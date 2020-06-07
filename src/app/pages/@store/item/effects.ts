import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  map,
  switchMap,
  catchError,
  withLatestFrom,
  concatMap,
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
  deleteItemSuccess,
  getItemIcons,
  getItemIconsSuccess,
  getItemIconsFailure,
  getItemShapes,
  getItemShapesSuccess,
  getItemShapesFailure,
  getItemElements,
  getItemElementsSuccess,
  getItemElementsFailure,
  getItemIconsSearch,
  getItemIconsSearchSuccess,
  getItemIconsSearchFailure,
  render,
  renderSuccess,
  renderFailure,
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
      switchMap((pramas) => {
        return this.modelService.getAll(pramas.payload).pipe(
          map((payload) => getItemsSuccess({ payload })),
          catchError((err) => {
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
      switchMap((pramas) => {
        return this.modelService.get(pramas.payload).pipe(
          map((payload) => getItemSuccess({ payload })),
          catchError((err) => {
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
      switchMap((pramas) => {
        return this.modelService.create(pramas.payload).pipe(
          map((payload) => createItemSuccess({ payload })),
          catchError((err) => {
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
      switchMap((pramas) => {
        return this.modelService.update(pramas.payload).pipe(
          map((payload) => updateItemSuccess({ payload })),
          catchError((err) => {
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
      switchMap((pramas) => {
        return this.modelService.delete(pramas.payload).pipe(
          map((payload) => deleteItemSuccess({ payload })),
          catchError((err) => {
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
      concatMap((action) =>
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

  getListIcons$ = createEffect(() =>
    this.actions.pipe(
      ofType(getItemIcons),
      switchMap((pramas) => {
        return this.modelService.getAll(pramas.payload).pipe(
          map((payload) => getItemIconsSuccess({ payload })),
          catchError((err) => {
            console.error(err);
            return of(getItemIconsFailure());
          })
        );
      })
    )
  );

  getListShapes$ = createEffect(() =>
    this.actions.pipe(
      ofType(getItemShapes),
      switchMap((pramas) => {
        return this.modelService.getAll(pramas.payload).pipe(
          map((payload) => getItemShapesSuccess({ payload })),
          catchError((err) => {
            console.error(err);
            return of(getItemShapesFailure());
          })
        );
      })
    )
  );

  getListElements$ = createEffect(() =>
    this.actions.pipe(
      ofType(getItemElements),
      switchMap((pramas) => {
        return this.modelService.getAll(pramas.payload).pipe(
          map((payload) => getItemElementsSuccess({ payload })),
          catchError((err) => {
            console.error(err);
            return of(getItemElementsFailure());
          })
        );
      })
    )
  );

  getSearch$ = createEffect(() =>
    this.actions.pipe(
      ofType(getItemIconsSearch),
      switchMap((pramas) => {
        return this.modelService.search(pramas.payload).pipe(
          map((payload) => getItemIconsSearchSuccess({ payload })),
          catchError((err) => {
            console.error(err);
            return of(getItemIconsSearchFailure());
          })
        );
      })
    )
  );

  render$ = createEffect(() =>
    this.actions.pipe(
      ofType(render),
      switchMap((params) => {
        return this.modelService.render(params.payload).pipe(
          map((payload) => {
            return renderSuccess({ payload });
          }),
          catchError((err) => {
            console.error(err);
            return of(renderFailure({ payload: err }));
          })
        );
      })
    )
  );
}
