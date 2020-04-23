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

import { CriterionService } from './service';
import { CriterionsActions } from './actions';

import { Store } from '@ngrx/store';
import * as fromBussiness from '.';
const {
  getCriterions,
  getCriterionsFailure,
  getCriterionsSuccess,
  getCriterion,
  getCriterionFailure,
  getCriterionSuccess,
  createCriterion,
  createCriterionFailure,
  createCriterionSuccess,
  updateCriterion,
  updateCriterionFailure,
  updateCriterionSuccess,
  deleteCriterion,
  deleteCriterionFailure,
  deleteCriterionSuccess,
} = CriterionsActions;

@Injectable()
export class CriterionEffects {
  constructor(
    private actions: Actions,
    private modelService: CriterionService,
    private store$: Store<fromBussiness.CriterionState>
  ) {}

  getList$ = createEffect(() =>
    this.actions.pipe(
      ofType(getCriterions),
      switchMap((pramas) => {
        return this.modelService.getAll(pramas).pipe(
          map((payload) => getCriterionsSuccess({ payload })),
          catchError((err) => {
            console.error(err);
            return of(getCriterionsFailure());
          })
        );
      })
    )
  );

  getOne$ = createEffect(() =>
    this.actions.pipe(
      ofType(getCriterion),
      switchMap((pramas) => {
        return this.modelService.get(pramas.payload).pipe(
          map((payload) => getCriterionSuccess({ payload })),
          catchError((err) => {
            console.error(err);
            return of(getCriterionFailure());
          })
        );
      })
    )
  );

  create$ = createEffect(() =>
    this.actions.pipe(
      ofType(createCriterion),
      switchMap((pramas) => {
        return this.modelService.create(pramas.payload).pipe(
          map((payload) => createCriterionSuccess({ payload })),
          catchError((err) => {
            console.error(err);
            return of(createCriterionFailure({ payload: err }));
          })
        );
      })
    )
  );

  update$ = createEffect(() =>
    this.actions.pipe(
      ofType(updateCriterion),
      switchMap((pramas) => {
        return this.modelService.update(pramas.payload).pipe(
          map((payload) => updateCriterionSuccess({ payload })),
          catchError((err) => {
            console.error(err);
            return of(updateCriterionFailure({ payload: err }));
          })
        );
      })
    )
  );

  delete$ = createEffect(() =>
    this.actions.pipe(
      ofType(deleteCriterion),
      switchMap((pramas) => {
        return this.modelService.delete(pramas.payload).pipe(
          map((payload) => deleteCriterionSuccess({ payload })),
          catchError((err) => {
            console.error(err);
            return of(deleteCriterionFailure({ payload: err }));
          })
        );
      })
    )
  );

  // changeSuccess$ = createEffect(() =>
  //   this.actions.pipe(
  //     ofType(deleteCriterionSuccess, updateCriterionSuccess, createCriterionSuccess),
  //     concatMap(action =>
  //       of(action).pipe(
  //         withLatestFrom(this.store$.select(fromBussiness.getCriterionsParams))
  //       )
  //     ),
  //     map(([action, params]) => {
  //       const payload = { ...params };
  //       return getCriterions({ payload });
  //     })
  //   )
  // );
}
