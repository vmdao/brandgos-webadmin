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

import { DriverService } from './service';
import { DriversActions } from './actions';

import { Store } from '@ngrx/store';
import * as fromBussiness from '.';
const {
  getDrivers,
  getDriversFailure,
  getDriversSuccess,
  getDriver,
  getDriverFailure,
  getDriverSuccess,
  createDriver,
  createDriverFailure,
  createDriverSuccess,
  updateDriver,
  updateDriverFailure,
  updateDriverSuccess,
  deleteDriver,
  deleteDriverFailure,
  deleteDriverSuccess
} = DriversActions;

@Injectable()
export class DriverEffects {
  constructor(
    private actions: Actions,
    private modelService: DriverService,
    private store$: Store<fromBussiness.DriverState>
  ) {}

  getList$ = createEffect(() =>
    this.actions.pipe(
      ofType(getDrivers),
      switchMap(pramas => {
        return this.modelService.getAll(pramas.payload).pipe(
          map(payload => getDriversSuccess({ payload })),
          catchError(err => {
            console.error(err);
            return of(getDriversFailure());
          })
        );
      })
    )
  );

  getOne$ = createEffect(() =>
    this.actions.pipe(
      ofType(getDriver),
      switchMap(pramas => {
        return this.modelService.get(pramas.payload).pipe(
          map(payload => getDriverSuccess({ payload })),
          catchError(err => {
            console.error(err);
            return of(getDriverFailure());
          })
        );
      })
    )
  );

  create$ = createEffect(() =>
    this.actions.pipe(
      ofType(createDriver),
      switchMap(pramas => {
        return this.modelService.create(pramas.payload).pipe(
          map(payload => createDriverSuccess({ payload })),
          catchError(err => {
            console.error(err);
            return of(createDriverFailure({ payload: err }));
          })
        );
      })
    )
  );

  update$ = createEffect(() =>
    this.actions.pipe(
      ofType(updateDriver),
      switchMap(pramas => {
        return this.modelService.update(pramas.payload).pipe(
          map(payload => updateDriverSuccess({ payload })),
          catchError(err => {
            console.error(err);
            return of(updateDriverFailure({ payload: err }));
          })
        );
      })
    )
  );

  delete$ = createEffect(() =>
    this.actions.pipe(
      ofType(deleteDriver),
      switchMap(pramas => {
        return this.modelService.delete(pramas.payload).pipe(
          map(payload => deleteDriverSuccess({ payload })),
          catchError(err => {
            console.error(err);
            return of(deleteDriverFailure({ payload: err }));
          })
        );
      })
    )
  );

  changeSuccess$ = createEffect(() =>
    this.actions.pipe(
      ofType(deleteDriverSuccess, updateDriverSuccess, createDriverSuccess),
      concatMap(action =>
        of(action).pipe(
          withLatestFrom(this.store$.select(fromBussiness.getDriversParams))
        )
      ),
      map(([action, params]) => {
        const payload = { ...params };
        return getDrivers({ payload });
      })
    )
  );
}
