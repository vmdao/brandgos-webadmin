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

import { AuthorityService } from './service';
import { AuthoritiesActions } from './actions';

import { Store } from '@ngrx/store';
import * as fromAuthority from '.';
const {
  getAuthorities,
  getAuthoritiesFailure,
  getAuthoritiesuccess,
  getAuthority,
  getAuthorityFailure,
  getAuthoritySuccess,
  createAuthority,
  createAuthorityFailure,
  createAuthoritySuccess,
  updateAuthority,
  updateAuthorityFailure,
  updateAuthoritySuccess,
  deleteAuthority,
  deleteAuthorityFailure,
  deleteAuthoritySuccess,
  getAuthorityPermissions,
  getAuthorityPermissionsFailure,
  getAuthorityPermissionsSuccess,
  getAppEntities,
  getAppEntitiesFailure,
  getAppEntitiesSuccess
} = AuthoritiesActions;

@Injectable()
export class AuthorityEffects {
  constructor(
    private actions: Actions,
    private modelService: AuthorityService,
    private store$: Store<fromAuthority.AuthorityState>
  ) {}

  getList$ = createEffect(() =>
    this.actions.pipe(
      ofType(getAuthorities),
      switchMap(pramas => {
        return this.modelService.getAll(pramas.payload).pipe(
          map(payload => getAuthoritiesuccess({ payload })),
          catchError(err => {
            console.error(err);
            return of(getAuthoritiesFailure());
          })
        );
      })
    )
  );

  getOne$ = createEffect(() =>
    this.actions.pipe(
      ofType(getAuthority),
      switchMap(pramas => {
        return this.modelService.get(pramas.payload).pipe(
          map(payload => getAuthoritySuccess({ payload })),
          catchError(err => {
            console.error(err);
            return of(getAuthorityFailure());
          })
        );
      })
    )
  );

  create$ = createEffect(() =>
    this.actions.pipe(
      ofType(createAuthority),
      switchMap(pramas => {
        return this.modelService.create(pramas.payload).pipe(
          map(payload => createAuthoritySuccess({ payload })),
          catchError(err => {
            console.error(err);
            return of(createAuthorityFailure({ payload: err }));
          })
        );
      })
    )
  );

  update$ = createEffect(() =>
    this.actions.pipe(
      ofType(updateAuthority),
      switchMap(pramas => {
        return this.modelService.update(pramas.payload).pipe(
          map(payload => updateAuthoritySuccess({ payload })),
          catchError(err => {
            console.error(err);
            return of(updateAuthorityFailure({ payload: err }));
          })
        );
      })
    )
  );

  delete$ = createEffect(() =>
    this.actions.pipe(
      ofType(deleteAuthority),
      switchMap(pramas => {
        return this.modelService.delete(pramas.payload).pipe(
          map(payload => deleteAuthoritySuccess({ payload })),
          catchError(err => {
            console.error(err);
            return of(deleteAuthorityFailure({ payload: err }));
          })
        );
      })
    )
  );

  changeSuccess$ = createEffect(() =>
    this.actions.pipe(
      ofType(
        deleteAuthoritySuccess,
        updateAuthoritySuccess,
        createAuthoritySuccess
      ),
      concatMap(action =>
        of(action).pipe(
          withLatestFrom(
            this.store$.select(fromAuthority.getAuthoritiesPagination)
          )
        )
      ),
      map(([action, authoritiesPagination]) => {
        const params = authoritiesPagination;
        const payload = { page: params.page, size: params.size };
        return getAuthorities({ payload });
      })
    )
  );

  changeSuccessUpdate$ = createEffect(() =>
    this.actions.pipe(
      ofType(updateAuthoritySuccess),
      concatMap(action =>
        of(action).pipe(
          withLatestFrom(this.store$.select(fromAuthority.getAuthoritiesView))
        )
      ),
      map(([action, authoritiesView]) =>
        getAuthorityPermissions({ payload: authoritiesView.id })
      )
    )
  );

  getAuthorityPermissions$ = createEffect(() =>
    this.actions.pipe(
      ofType(getAuthorityPermissions),
      switchMap(pramas => {
        return this.modelService.getPermissions(pramas.payload).pipe(
          map(payload => getAuthorityPermissionsSuccess({ payload })),
          catchError(err => {
            console.error(err);
            return of(getAuthorityPermissionsFailure());
          })
        );
      })
    )
  );

  getAppEntities$ = createEffect(() =>
    this.actions.pipe(
      ofType(getAppEntities),
      switchMap(pramas => {
        return this.modelService.getAppEntities().pipe(
          map(payload => getAppEntitiesSuccess({ payload })),
          catchError(err => {
            console.error(err);
            return of(getAppEntitiesFailure());
          })
        );
      })
    )
  );
}
