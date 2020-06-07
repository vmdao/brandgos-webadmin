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
import { CollectionService } from './service';
import { CollectionsActions } from './actions';

import { Store } from '@ngrx/store';
import * as fromCollection from './';
const {
  getCollections,
  getCollectionsFailure,
  getCollectionsSuccess,
  getCollection,
  getCollectionFailure,
  getCollectionSuccess,
  createCollection,
  createCollectionFailure,
  createCollectionSuccess,
  updateCollection,
  updateCollectionFailure,
  updateCollectionSuccess,
  deleteCollection,
  deleteCollectionFailure,
  deleteCollectionSuccess,
} = CollectionsActions;

@Injectable()
export class CollectionEffects {
  constructor(
    private actions: Actions,
    private modelService: CollectionService,
    private store$: Store<fromCollection.CollectionState>
  ) {}

  getList$ = createEffect(() =>
    this.actions.pipe(
      ofType(getCollections),
      switchMap((pramas) => {
        return this.modelService.getAll(pramas.payload).pipe(
          map((payload) => getCollectionsSuccess({ payload })),
          catchError((err) => {
            console.error(err);
            return of(getCollectionsFailure());
          })
        );
      })
    )
  );

  getOne$ = createEffect(() =>
    this.actions.pipe(
      ofType(getCollection),
      switchMap((pramas) => {
        return this.modelService.get(pramas.payload).pipe(
          map((payload) => getCollectionSuccess({ payload })),
          catchError((err) => {
            console.error(err);
            return of(getCollectionFailure());
          })
        );
      })
    )
  );

  create$ = createEffect(() =>
    this.actions.pipe(
      ofType(createCollection),
      switchMap((pramas) => {
        return this.modelService.create(pramas.payload).pipe(
          map((payload) => createCollectionSuccess({ payload })),
          catchError((err) => {
            console.error(err);
            return of(createCollectionFailure({ payload: err }));
          })
        );
      })
    )
  );

  update$ = createEffect(() =>
    this.actions.pipe(
      ofType(updateCollection),
      switchMap((pramas) => {
        return this.modelService.update(pramas.payload).pipe(
          map((payload) => updateCollectionSuccess({ payload })),
          catchError((err) => {
            console.error(err);
            return of(updateCollectionFailure({ payload: err }));
          })
        );
      })
    )
  );

  delete$ = createEffect(() =>
    this.actions.pipe(
      ofType(deleteCollection),
      switchMap((pramas) => {
        return this.modelService.delete(pramas.payload).pipe(
          map((payload) => deleteCollectionSuccess({ payload })),
          catchError((err) => {
            console.error(err);
            return of(deleteCollectionFailure({ payload: err }));
          })
        );
      })
    )
  );

  changeSuccess$ = createEffect(() =>
    this.actions.pipe(
      ofType(
        deleteCollectionSuccess,
        updateCollectionSuccess,
        createCollectionSuccess
      ),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(
            this.store$.select(fromCollection.getCollectionsParams)
          )
        )
      ),
      map(([action, params]) => {
        const payload = { ...params };
        return getCollections({ payload });
      })
    )
  );
}
