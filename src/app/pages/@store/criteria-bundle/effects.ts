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

import { CriteriaBundleService } from './service';
import { CriteriaBundlesActions } from './actions';

import { Store } from '@ngrx/store';
import * as fromBussiness from '.';
const {
  getCriteriaBundles,
  getCriteriaBundlesFailure,
  getCriteriaBundlesSuccess,
  getCriteriaBundle,
  getCriteriaBundleFailure,
  getCriteriaBundleSuccess,
  createCriteriaBundle,
  createCriteriaBundleFailure,
  createCriteriaBundleSuccess,
  updateCriteriaBundle,
  updateCriteriaBundleFailure,
  updateCriteriaBundleSuccess,
  deleteCriteriaBundle,
  deleteCriteriaBundleFailure,
  deleteCriteriaBundleSuccess,
  getCriteriaBundleCriterions,
  getCriteriaBundleCriterionsSuccess,
  getCriteriaBundleCriterionsFailure,
} = CriteriaBundlesActions;

@Injectable()
export class CriteriaBundleEffects {
  constructor(
    private actions: Actions,
    private modelService: CriteriaBundleService,
    private store$: Store<fromBussiness.CriteriaBundleState>
  ) {}

  getList$ = createEffect(() =>
    this.actions.pipe(
      ofType(getCriteriaBundles),
      switchMap((pramas) => {
        return this.modelService.getAll(pramas.payload).pipe(
          map((payload) => getCriteriaBundlesSuccess({ payload })),
          catchError((err) => {
            console.error(err);
            return of(getCriteriaBundlesFailure());
          })
        );
      })
    )
  );

  getOne$ = createEffect(() =>
    this.actions.pipe(
      ofType(getCriteriaBundle),
      switchMap((pramas) => {
        return this.modelService.get(pramas.payload).pipe(
          map((payload) => getCriteriaBundleSuccess({ payload })),
          catchError((err) => {
            console.error(err);
            return of(getCriteriaBundleFailure());
          })
        );
      })
    )
  );

  create$ = createEffect(() =>
    this.actions.pipe(
      ofType(createCriteriaBundle),
      switchMap((pramas) => {
        return this.modelService.create(pramas.payload).pipe(
          map((payload) => createCriteriaBundleSuccess({ payload })),
          catchError((err) => {
            console.error(err);
            return of(createCriteriaBundleFailure({ payload: err }));
          })
        );
      })
    )
  );

  update$ = createEffect(() =>
    this.actions.pipe(
      ofType(updateCriteriaBundle),
      switchMap((pramas) => {
        return this.modelService.update(pramas.payload).pipe(
          map((payload) => updateCriteriaBundleSuccess({ payload })),
          catchError((err) => {
            console.error(err);
            return of(updateCriteriaBundleFailure({ payload: err }));
          })
        );
      })
    )
  );

  delete$ = createEffect(() =>
    this.actions.pipe(
      ofType(deleteCriteriaBundle),
      switchMap((pramas) => {
        return this.modelService.delete(pramas.payload).pipe(
          map((payload) => deleteCriteriaBundleSuccess({ payload })),
          catchError((err) => {
            console.error(err);
            return of(deleteCriteriaBundleFailure({ payload: err }));
          })
        );
      })
    )
  );

  changeSuccess$ = createEffect(() =>
    this.actions.pipe(
      ofType(
        deleteCriteriaBundleSuccess,
        updateCriteriaBundleSuccess,
        createCriteriaBundleSuccess
      ),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(
            this.store$.select(fromBussiness.getCriteriaBundlesParams)
          )
        )
      ),
      map(([action, params]) => {
        const payload = { ...params };
        return getCriteriaBundles({ payload });
      })
    )
  );

  getCriterions$ = createEffect(() =>
    this.actions.pipe(
      ofType(getCriteriaBundleCriterions),
      switchMap((pramas) => {
        return this.modelService.getCriterions(pramas.payload).pipe(
          map((payload) => getCriteriaBundleCriterionsSuccess({ payload })),
          catchError((err) => {
            console.error(err);
            return of(getCriteriaBundleCriterionsFailure());
          })
        );
      })
    )
  );
}
