import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  map,
  switchMap,
  catchError,
  withLatestFrom,
  concatMap,
  finalize,
  tap,
  mapTo
} from 'rxjs/operators';

import { UserService } from './service';
import { UsersActions } from './actions';

import { Store } from '@ngrx/store';
import * as fromUser from './';
import { SettingService } from '@app/@core/services';
const {
  getUsers,
  getUsersFailure,
  getUsersSuccess,
  getUser,
  getUserFailure,
  getUserSuccess,
  createUser,
  createUserFailure,
  createUserSuccess,
  updateUser,
  updateUserFailure,
  updateUserSuccess,
  deleteUser,
  deleteUserFailure,
  deleteUserSuccess,
  getUserAuthorities,
  getUserAuthoritiesSuccess,
  getUserAuthoritiesFailure,
  getProfile,
  getProfileSuccess,
  getProfileFailure,
  updateProfilePassword,
  updateProfilePasswordSuccess,
  updateProfilePasswordFailure,
  getProfilePermissions,
  getProfilePermissionsSuccess,
  getProfilePermissionsFailure
} = UsersActions;

@Injectable()
export class UserEffects {
  constructor(
    private actions: Actions,
    private modelService: UserService,
    private settingService: SettingService,
    private store$: Store<fromUser.UserState>
  ) {}

  getList$ = createEffect(() =>
    this.actions.pipe(
      ofType(getUsers),
      switchMap(pramas => {
        return this.modelService.getAll(pramas.payload).pipe(
          map(payload => getUsersSuccess({ payload })),
          catchError(err => {
            console.error(err);
            return of(getUsersFailure());
          })
        );
      })
    )
  );

  getOne$ = createEffect(() =>
    this.actions.pipe(
      ofType(getUser),
      switchMap(pramas => {
        return this.modelService.get(pramas.payload).pipe(
          map(payload => getUserSuccess({ payload })),
          catchError(err => {
            console.error(err);
            return of(getUserFailure());
          })
        );
      })
    )
  );

  create$ = createEffect(() =>
    this.actions.pipe(
      ofType(createUser),
      switchMap(pramas => {
        return this.modelService.create(pramas.payload).pipe(
          map(payload => createUserSuccess({ payload })),
          catchError(err => {
            console.error(err);
            return of(createUserFailure({ payload: err }));
          })
        );
      })
    )
  );

  update$ = createEffect(() =>
    this.actions.pipe(
      ofType(updateUser),
      switchMap(pramas => {
        return this.modelService.update(pramas.payload).pipe(
          map(payload => updateUserSuccess({ payload })),
          catchError(err => {
            console.error(err);
            return of(updateUserFailure({ payload: err }));
          })
        );
      })
    )
  );

  delete$ = createEffect(() =>
    this.actions.pipe(
      ofType(deleteUser),
      switchMap(pramas => {
        return this.modelService.delete(pramas.payload).pipe(
          map(payload => deleteUserSuccess({ payload })),
          catchError(err => {
            console.error(err);
            return of(deleteUserFailure({ payload: err }));
          })
        );
      })
    )
  );

  changeSuccess$ = createEffect(() =>
    this.actions.pipe(
      ofType(deleteUserSuccess, updateUserSuccess, createUserSuccess),
      concatMap(action =>
        of(action).pipe(
          withLatestFrom(this.store$.select(fromUser.getUsersParams))
        )
      ),
      map(([action, params]) => {
        const payload = { ...params };
        return getUsers({ payload });
      })
    )
  );

  getUserAuthorities$ = createEffect(() =>
    this.actions.pipe(
      ofType(getUserAuthorities),
      switchMap(pramas => {
        return this.modelService.getAuthorities(pramas.payload).pipe(
          map(payload => getUserAuthoritiesSuccess({ payload })),
          catchError(err => {
            console.error(err);
            return of(getUserAuthoritiesFailure());
          })
        );
      })
    )
  );

  getProfile$ = createEffect(() =>
    this.actions.pipe(
      ofType(getProfile),
      switchMap(pramas => {
        return this.modelService.getProfile().pipe(
          map(payload => getProfileSuccess({ payload })),
          catchError(err => {
            console.error(err);
            return of(getProfileFailure());
          })
        );
      })
    )
  );

  getProfilePermissions$ = createEffect(() =>
    this.actions.pipe(
      ofType(getProfilePermissions),
      switchMap(pramas => {
        return this.modelService.getProfilePermissions().pipe(
          map(payload => getProfilePermissionsSuccess({ payload })),
          catchError(err => {
            console.error(err);
            return of(getProfilePermissionsFailure());
          })
        );
      })
    )
  );

  getProfilePermissionsSuccess$ = createEffect(() =>
    this.actions.pipe(
      ofType(getProfilePermissionsSuccess),
      switchMap(params => {
        const { payload } = params;
        if (payload.status === 1 && Array.isArray(payload.data)) {
          const roles = payload.data.map(r => {
            return `${r.appEntityCode}-${r.action}`;
          });
          this.settingService.setRoles(roles);
        }
        return [];
      })
    )
  );

  updateProfilePassword$ = createEffect(() =>
    this.actions.pipe(
      ofType(updateProfilePassword),
      switchMap(pramas => {
        return this.modelService.updateProfilePassword(pramas.payload).pipe(
          map(payload => updateProfilePasswordSuccess({ payload })),
          catchError(err => {
            console.error(err);
            return of(updateProfilePasswordFailure());
          })
        );
      })
    )
  );
}
