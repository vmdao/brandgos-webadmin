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

import { ProjectService } from './service';
import { ProjectsActions } from './actions';

import { Store } from '@ngrx/store';
import * as fromBussiness from '.';
const {
  getProjects,
  getProjectsFailure,
  getProjectsSuccess,
  getProject,
  getProjectFailure,
  getProjectSuccess,
  createProject,
  createProjectFailure,
  createProjectSuccess,
  updateProject,
  updateProjectFailure,
  updateProjectSuccess,
  deleteProject,
  deleteProjectFailure,
  deleteProjectSuccess
} = ProjectsActions;

@Injectable()
export class ProjectEffects {
  constructor(
    private actions: Actions,
    private modelService: ProjectService,
    private store$: Store<fromBussiness.ProjectState>
  ) {}

  getList$ = createEffect(() =>
    this.actions.pipe(
      ofType(getProjects),
      switchMap(pramas => {
        return this.modelService.getAll(pramas.payload).pipe(
          map(payload => getProjectsSuccess({ payload })),
          catchError(err => {
            console.error(err);
            return of(getProjectsFailure());
          })
        );
      })
    )
  );

  getOne$ = createEffect(() =>
    this.actions.pipe(
      ofType(getProject),
      switchMap(pramas => {
        return this.modelService.get(pramas.payload).pipe(
          map(payload => getProjectSuccess({ payload })),
          catchError(err => {
            console.error(err);
            return of(getProjectFailure());
          })
        );
      })
    )
  );

  create$ = createEffect(() =>
    this.actions.pipe(
      ofType(createProject),
      switchMap(pramas => {
        return this.modelService.create(pramas.payload).pipe(
          map(payload => createProjectSuccess({ payload })),
          catchError(err => {
            console.error(err);
            return of(createProjectFailure({ payload: err }));
          })
        );
      })
    )
  );

  update$ = createEffect(() =>
    this.actions.pipe(
      ofType(updateProject),
      switchMap(pramas => {
        return this.modelService.update(pramas.payload).pipe(
          map(payload => updateProjectSuccess({ payload })),
          catchError(err => {
            console.error(err);
            return of(updateProjectFailure({ payload: err }));
          })
        );
      })
    )
  );

  delete$ = createEffect(() =>
    this.actions.pipe(
      ofType(deleteProject),
      switchMap(pramas => {
        return this.modelService.delete(pramas.payload).pipe(
          map(payload => deleteProjectSuccess({ payload })),
          catchError(err => {
            console.error(err);
            return of(deleteProjectFailure({ payload: err }));
          })
        );
      })
    )
  );

  changeSuccess$ = createEffect(() =>
    this.actions.pipe(
      ofType(deleteProjectSuccess, updateProjectSuccess, createProjectSuccess),
      concatMap(action =>
        of(action).pipe(
          withLatestFrom(this.store$.select(fromBussiness.getProjectsParams))
        )
      ),
      map(([action, params]) => {
        const payload = { ...params };
        return getProjects({ payload });
      })
    )
  );
}
