import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  map,
  switchMap,
  catchError,
  concatMap,
  withLatestFrom
} from 'rxjs/operators';

import { LorryService } from './service';
import { LorriesActions } from './actions';
import { Store } from '@ngrx/store';
import * as fromBussiness from '.';
const {
  getLorries,
  getLorriesFailure,
  getLorriesSuccess,
  getLorry,
  getLorryFailure,
  getLorriesuccess,
  createLorry,
  createLorryFailure,
  createLorrySuccess,
  updateLorry,
  updateLorryFailure,
  updateLorrySuccess,
  deleteLorry,
  deleteLorryFailure,
  deleteLorrySuccess
} = LorriesActions;

@Injectable()
export class LorryEffects {
  constructor(
    private actions: Actions,
    private modelService: LorryService,
    private store$: Store<fromBussiness.LorryState>
  ) {}

  getList$ = createEffect(() =>
    this.actions.pipe(
      ofType(getLorries),
      switchMap(pramas => {
        return this.modelService.getAll(pramas.payload).pipe(
          map(payload => getLorriesSuccess({ payload })),
          catchError(err => {
            console.error(err);
            return of(getLorriesFailure());
          })
        );
      })
    )
  );

  getOne$ = createEffect(() =>
    this.actions.pipe(
      ofType(getLorry),
      switchMap(pramas => {
        return this.modelService.get(pramas.payload).pipe(
          map(payload => getLorriesuccess({ payload })),
          catchError(err => {
            console.error(err);
            return of(getLorryFailure());
          })
        );
      })
    )
  );

  create$ = createEffect(() =>
    this.actions.pipe(
      ofType(createLorry),
      switchMap(pramas => {
        return this.modelService.create(pramas.payload).pipe(
          switchMap(payload => [createLorrySuccess({ payload })]),
          catchError(err => {
            console.error(err);
            return of(createLorryFailure({ payload: err }));
          })
        );
      })
    )
  );

  update$ = createEffect(() =>
    this.actions.pipe(
      ofType(updateLorry),
      switchMap(pramas => {
        return this.modelService.update(pramas.payload).pipe(
          map(payload => updateLorrySuccess({ payload })),
          catchError(err => {
            console.error(err);
            return of(updateLorryFailure({ payload: err }));
          })
        );
      })
    )
  );

  delete$ = createEffect(() =>
    this.actions.pipe(
      ofType(deleteLorry),
      switchMap(pramas => {
        return this.modelService.delete(pramas.payload).pipe(
          map(payload => deleteLorrySuccess({ payload })),
          catchError(err => {
            console.error(err);
            return of(deleteLorryFailure({ payload: err }));
          })
        );
      })
    )
  );

  changeSuccess$ = createEffect(() =>
    this.actions.pipe(
      ofType(deleteLorrySuccess, updateLorrySuccess, createLorrySuccess),
      concatMap(action =>
        of(action).pipe(
          withLatestFrom(this.store$.select(fromBussiness.getLorriesParams))
        )
      ),
      map(([action, params]) => {
        const payload = { ...params };
        return getLorries({ payload });
      })
    )
  );
}
