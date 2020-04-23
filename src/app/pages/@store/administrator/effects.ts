import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { AdministratorService } from './service';
import {
  AdministratorActionsTypes,
  GetAdministrator,
  GetAdministratorSuccess,
  GetAdministratorFailure,
  GetAdministratorsSuccess,
  GetAdministratorsFailure,
  CreateAdministrator,
  CreateAdministratorSuccess,
  InitAdministrator,
  UpdateAdministrator
} from './actions';

@Injectable()
export class AdministratorEffects {
  constructor(
    private actions: Actions,
    private modelService: AdministratorService
  ) {}

  @Effect()
  getList$ = this.actions.pipe(
    ofType(AdministratorActionsTypes.GET_ADMINISTRATORS),
    switchMap(() => {
      return this.modelService.getAll({}).pipe(
        map(res => new GetAdministratorsSuccess(res)),
        catchError(err => {
          console.error(err);
          return of(new GetAdministratorsFailure());
        })
      );
    })
  );

  @Effect()
  getOne$ = this.actions.pipe(
    ofType(AdministratorActionsTypes.GET_ADMINISTRATOR),
    switchMap((res: GetAdministrator) => {
      const key = res.payload;
      return this.modelService.get(key).pipe(
        map(res2 => new GetAdministratorSuccess(res2)),
        catchError(err => {
          console.error(err);
          return of(new GetAdministratorFailure());
        })
      );
    })
  );

  @Effect()
  create$ = this.actions.pipe(
    ofType(AdministratorActionsTypes.CREATE_ADMINISTRATOR),
    switchMap((data: CreateAdministrator) => {
      return this.modelService.create(data.payload).pipe(
        map(res => new CreateAdministratorSuccess(res)),
        catchError(err => {
          console.error(err);
          return of(new GetAdministratorsFailure());
        })
      );
    })
  );

  @Effect()
  update$ = this.actions.pipe(
    ofType(AdministratorActionsTypes.UPDATE_ADMINISTRATOR),
    switchMap((data: UpdateAdministrator) => {
      return this.modelService.update(data.payload).pipe(
        map(res => new CreateAdministratorSuccess(res)),
        catchError(err => {
          console.error(err);
          return of(new GetAdministratorsFailure());
        })
      );
    })
  );

  @Effect()
  createSuccess$ = this.actions.pipe(
    ofType(AdministratorActionsTypes.CREATE_ADMINISTRATOR_SUCCESS),
    map(() => new InitAdministrator())
  );

  @Effect()
  updateSuccess$ = this.actions.pipe(
    ofType(AdministratorActionsTypes.UPDATE_ADMINISTRATOR_SUCCESS),
    map(() => new InitAdministrator())
  );
}
