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

import { ContractorService } from './service';
import { ContractorsActions } from './actions';

import { Store } from '@ngrx/store';
import * as fromBussiness from '.';
const {
  getContractors,
  getContractorsFailure,
  getContractorsSuccess,
  getContractor,
  getContractorFailure,
  getContractorSuccess,
  createContractor,
  createContractorFailure,
  createContractorSuccess,
  updateContractor,
  updateContractorFailure,
  updateContractorSuccess,
  deleteContractor,
  deleteContractorFailure,
  deleteContractorSuccess
} = ContractorsActions;

@Injectable()
export class ContractorEffects {
  constructor(
    private actions: Actions,
    private modelService: ContractorService,
    private store$: Store<fromBussiness.ContractorState>
  ) {}

  getList$ = createEffect(() =>
    this.actions.pipe(
      ofType(getContractors),
      switchMap(pramas => {
        return this.modelService.getAll(pramas.payload).pipe(
          map(payload => getContractorsSuccess({ payload })),
          catchError(err => {
            console.error(err);
            return of(getContractorsFailure());
          })
        );
      })
    )
  );

  getOne$ = createEffect(() =>
    this.actions.pipe(
      ofType(getContractor),
      switchMap(pramas => {
        return this.modelService.get(pramas.payload).pipe(
          map(payload => getContractorSuccess({ payload })),
          catchError(err => {
            console.error(err);
            return of(getContractorFailure());
          })
        );
      })
    )
  );

  create$ = createEffect(() =>
    this.actions.pipe(
      ofType(createContractor),
      switchMap(pramas => {
        return this.modelService.create(pramas.payload).pipe(
          map(payload => createContractorSuccess({ payload })),
          catchError(err => {
            console.error(err);
            return of(createContractorFailure({ payload: err }));
          })
        );
      })
    )
  );

  update$ = createEffect(() =>
    this.actions.pipe(
      ofType(updateContractor),
      switchMap(pramas => {
        return this.modelService.update(pramas.payload).pipe(
          map(payload => updateContractorSuccess({ payload })),
          catchError(err => {
            console.error(err);
            return of(updateContractorFailure({ payload: err }));
          })
        );
      })
    )
  );

  delete$ = createEffect(() =>
    this.actions.pipe(
      ofType(deleteContractor),
      switchMap(pramas => {
        return this.modelService.delete(pramas.payload).pipe(
          map(payload => deleteContractorSuccess({ payload })),
          catchError(err => {
            console.error(err);
            return of(deleteContractorFailure({ payload: err }));
          })
        );
      })
    )
  );

  changeSuccess$ = createEffect(() =>
    this.actions.pipe(
      ofType(deleteContractorSuccess, updateContractorSuccess, createContractorSuccess),
      concatMap(action =>
        of(action).pipe(
          withLatestFrom(this.store$.select(fromBussiness.getContractorsParams))
        )
      ),
      map(([action, params]) => {
        const payload = { ...params };
        return getContractors({ payload });
      })
    )
  );
}
