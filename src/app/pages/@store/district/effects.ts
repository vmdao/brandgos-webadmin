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

import { DistrictService } from './service';
import { DistrictsActions } from './actions';

import { Store } from '@ngrx/store';
import * as fromBussiness from '.';
const {
  getDistricts,
  getDistrictsFailure,
  getDistrictsSuccess,
  getDistrict,
  getDistrictFailure,
  getDistrictSuccess,
  createDistrict,
  createDistrictFailure,
  createDistrictSuccess,
  updateDistrict,
  updateDistrictFailure,
  updateDistrictSuccess,
  deleteDistrict,
  deleteDistrictFailure,
  deleteDistrictSuccess
} = DistrictsActions;

@Injectable()
export class DistrictEffects {
  constructor(
    private actions: Actions,
    private modelService: DistrictService,
    private store$: Store<fromBussiness.DistrictState>
  ) {}

  getList$ = createEffect(() =>
    this.actions.pipe(
      ofType(getDistricts),
      switchMap(pramas => {
        return this.modelService.getAll(pramas.payload).pipe(
          map(payload => getDistrictsSuccess({ payload })),
          catchError(err => {
            console.error(err);
            return of(getDistrictsFailure());
          })
        );
      })
    )
  );

  getOne$ = createEffect(() =>
    this.actions.pipe(
      ofType(getDistrict),
      switchMap(pramas => {
        return this.modelService.get(pramas.payload).pipe(
          map(payload => getDistrictSuccess({ payload })),
          catchError(err => {
            console.error(err);
            return of(getDistrictFailure());
          })
        );
      })
    )
  );

  create$ = createEffect(() =>
    this.actions.pipe(
      ofType(createDistrict),
      switchMap(pramas => {
        return this.modelService.create(pramas.payload).pipe(
          map(payload => createDistrictSuccess({ payload })),
          catchError(err => {
            console.error(err);
            return of(createDistrictFailure({ payload: err }));
          })
        );
      })
    )
  );

  update$ = createEffect(() =>
    this.actions.pipe(
      ofType(updateDistrict),
      switchMap(pramas => {
        return this.modelService.update(pramas.payload).pipe(
          map(payload => updateDistrictSuccess({ payload })),
          catchError(err => {
            console.error(err);
            return of(updateDistrictFailure({ payload: err }));
          })
        );
      })
    )
  );

  delete$ = createEffect(() =>
    this.actions.pipe(
      ofType(deleteDistrict),
      switchMap(pramas => {
        return this.modelService.delete(pramas.payload).pipe(
          map(payload => deleteDistrictSuccess({ payload })),
          catchError(err => {
            console.error(err);
            return of(deleteDistrictFailure({ payload: err }));
          })
        );
      })
    )
  );

  changeSuccess$ = createEffect(() =>
    this.actions.pipe(
      ofType(deleteDistrictSuccess, updateDistrictSuccess, createDistrictSuccess),
      concatMap(action =>
        of(action).pipe(
          withLatestFrom(this.store$.select(fromBussiness.getDistrictsParams))
        )
      ),
      map(([action, params]) => {
        const payload = { ...params };
        return getDistricts({ payload });
      })
    )
  );
}
