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

import { WorkerService } from './service';
import { WorkersActions } from './actions';

import { Store } from '@ngrx/store';
import * as fromBussiness from '.';
const {
  getWorkers,
  getWorkersFailure,
  getWorkersSuccess,
  getWorker,
  getWorkerFailure,
  getWorkerSuccess,
  createWorker,
  createWorkerFailure,
  createWorkerSuccess,
  updateWorker,
  updateWorkerFailure,
  updateWorkerSuccess,
  deleteWorker,
  deleteWorkerFailure,
  deleteWorkerSuccess,

  getLeadersIdle,
  getLeadersIdleFailure,
  getLeadersIdleSuccess,

  getWorkersIdle,
  getWorkersIdleFailure,
  getWorkersIdleSuccess,
} = WorkersActions;

@Injectable()
export class WorkerEffects {
  constructor(
    private actions: Actions,
    private modelService: WorkerService,
    private store$: Store<fromBussiness.WorkerState>
  ) {}

  getList$ = createEffect(() =>
    this.actions.pipe(
      ofType(getWorkers),
      switchMap((pramas) => {
        return this.modelService.getAll(pramas.payload).pipe(
          map((payload) => getWorkersSuccess({ payload })),
          catchError((err) => {
            console.error(err);
            return of(getWorkersFailure());
          })
        );
      })
    )
  );

  getOne$ = createEffect(() =>
    this.actions.pipe(
      ofType(getWorker),
      switchMap((pramas) => {
        return this.modelService.get(pramas.payload).pipe(
          map((payload) => getWorkerSuccess({ payload })),
          catchError((err) => {
            console.error(err);
            return of(getWorkerFailure());
          })
        );
      })
    )
  );

  create$ = createEffect(() =>
    this.actions.pipe(
      ofType(createWorker),
      switchMap((pramas) => {
        return this.modelService.create(pramas.payload).pipe(
          map((payload) => createWorkerSuccess({ payload })),
          catchError((err) => {
            console.error(err);
            return of(createWorkerFailure({ payload: err }));
          })
        );
      })
    )
  );

  update$ = createEffect(() =>
    this.actions.pipe(
      ofType(updateWorker),
      switchMap((pramas) => {
        return this.modelService.update(pramas.payload).pipe(
          map((payload) => updateWorkerSuccess({ payload })),
          catchError((err) => {
            console.error(err);
            return of(updateWorkerFailure({ payload: err }));
          })
        );
      })
    )
  );

  delete$ = createEffect(() =>
    this.actions.pipe(
      ofType(deleteWorker),
      switchMap((pramas) => {
        return this.modelService.delete(pramas.payload).pipe(
          map((payload) => deleteWorkerSuccess({ payload })),
          catchError((err) => {
            console.error(err);
            return of(deleteWorkerFailure({ payload: err }));
          })
        );
      })
    )
  );

  changeSuccess$ = createEffect(() =>
    this.actions.pipe(
      ofType(deleteWorkerSuccess, updateWorkerSuccess, createWorkerSuccess),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(this.store$.select(fromBussiness.getWorkersParams))
        )
      ),
      map(([action, params]) => {
        const payload = { ...params };
        return getWorkers({ payload });
      })
    )
  );

  getLeadersIdle$ = createEffect(() =>
    this.actions.pipe(
      ofType(getLeadersIdle),
      switchMap((pramas) => {
        return this.modelService.getAll(pramas.payload).pipe(
          map((payload) => getLeadersIdleSuccess({ payload })),
          catchError((err) => {
            console.error(err);
            return of(getLeadersIdleFailure());
          })
        );
      })
    )
  );

  getWorkersIdle$ = createEffect(() =>
    this.actions.pipe(
      ofType(getWorkersIdle),
      switchMap((pramas) => {
        return this.modelService.getAll(pramas.payload).pipe(
          map((payload) => getWorkersIdleSuccess({ payload })),
          catchError((err) => {
            console.error(err);
            return of(getWorkersIdleFailure());
          })
        );
      })
    )
  );
}
