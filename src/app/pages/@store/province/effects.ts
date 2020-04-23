import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  map,
  switchMap,
  catchError,
  withLatestFrom,
  concatMap,
  delay,
} from 'rxjs/operators';

import { ProvinceService } from './service';
import { ProvincesActions } from './actions';

import { Store } from '@ngrx/store';
import * as fromBussiness from '.';
const {
  getProvinces,
  getProvincesFailure,
  getProvincesSuccess,
  getProvince,
  getProvinceFailure,
  getProvinceSuccess,
  createProvince,
  createProvinceFailure,
  createProvinceSuccess,
  updateProvince,
  updateProvinceFailure,
  updateProvinceSuccess,
  deleteProvince,
  deleteProvinceFailure,
  deleteProvinceSuccess,
  getProvinceDistricts,
  getProvinceDistrictsSuccess,
  getProvinceDistrictsFailure,
} = ProvincesActions;

@Injectable()
export class ProvinceEffects {
  constructor(
    private actions: Actions,
    private modelService: ProvinceService,
    private store$: Store<fromBussiness.ProvinceState>
  ) {}

  getList$ = createEffect(() =>
    this.actions.pipe(
      ofType(getProvinces),
      switchMap((pramas) => {
        return this.modelService.getAll(pramas.payload).pipe(
          map((payload) => getProvincesSuccess({ payload })),
          catchError((err) => {
            console.error(err);
            return of(getProvincesFailure());
          })
        );
      })
    )
  );

  getOne$ = createEffect(() =>
    this.actions.pipe(
      ofType(getProvince),
      switchMap((pramas) => {
        return this.modelService.get(pramas.payload).pipe(
          map((payload) => getProvinceSuccess({ payload })),
          catchError((err) => {
            console.error(err);
            return of(getProvinceFailure());
          })
        );
      })
    )
  );

  create$ = createEffect(() =>
    this.actions.pipe(
      ofType(createProvince),
      switchMap((pramas) => {
        return this.modelService.create(pramas.payload).pipe(
          map((payload) => createProvinceSuccess({ payload })),
          catchError((err) => {
            console.error(err);
            return of(createProvinceFailure({ payload: err }));
          })
        );
      })
    )
  );

  update$ = createEffect(() =>
    this.actions.pipe(
      ofType(updateProvince),
      switchMap((pramas) => {
        return this.modelService.update(pramas.payload).pipe(
          map((payload) => updateProvinceSuccess({ payload })),
          catchError((err) => {
            console.error(err);
            return of(updateProvinceFailure({ payload: err }));
          })
        );
      })
    )
  );

  delete$ = createEffect(() =>
    this.actions.pipe(
      ofType(deleteProvince),
      switchMap((pramas) => {
        return this.modelService.delete(pramas.payload).pipe(
          map((payload) => deleteProvinceSuccess({ payload })),
          catchError((err) => {
            console.error(err);
            return of(deleteProvinceFailure({ payload: err }));
          })
        );
      })
    )
  );

  changeSuccess$ = createEffect(() =>
    this.actions.pipe(
      ofType(
        deleteProvinceSuccess,
        updateProvinceSuccess,
        createProvinceSuccess
      ),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(this.store$.select(fromBussiness.getProvincesParams))
        )
      ),
      map(([action, params]) => {
        const payload = { ...params };
        return getProvinces({ payload });
      })
    )
  );

  getDistricts$ = createEffect(() =>
    this.actions.pipe(
      ofType(getProvinceDistricts),
      switchMap((pramas) => {
        return this.modelService.getDistricts(pramas.id, pramas.options).pipe(
          delay(500),
          map((payload) => getProvinceDistrictsSuccess({ payload })),
          catchError((err) => {
            console.error(err);
            return of(getProvinceDistrictsFailure());
          })
        );
      })
    )
  );
}
