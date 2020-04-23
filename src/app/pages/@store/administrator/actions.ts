import { Action } from '@ngrx/store';
import {
  AdministratorResultsModel,
  AdministratorResultModel
} from './results.model';
import { AdministratorModel } from './model';

export enum AdministratorActionsTypes {
  GET_ADMINISTRATORS = '[ADMINISTRATOR] Get Administrators',
  GET_ADMINISTRATORS_SUCCESS = '[ADMINISTRATOR] Get Administrators Success',
  GET_ADMINISTRATORS_FAILURE = '[ADMINISTRATOR] Get Administrators Failure',

  GET_ADMINISTRATOR = '[ADMINISTRATOR] Get Administrator',
  GET_ADMINISTRATOR_SUCCESS = '[ADMINISTRATOR] Get Administrator Success',
  GET_ADMINISTRATOR_FAILURE = '[ADMINISTRATOR] Get Administrator Failure',

  DELETE_ADMINISTRATOR = '[ADMINISTRATOR] Delete Administrators',
  DELETE_ADMINISTRATOR_SUCCESS = '[ADMINISTRATOR] Delete Administrator Success',
  DELETE_ADMINISTRATOR_FAILURE = '[ADMINISTRATOR] Delete Administrator Failure',

  UPDATE_ADMINISTRATOR = '[ADMINISTRATOR] Update Administrator',
  UPDATE_ADMINISTRATOR_SUCCESS = '[ADMINISTRATOR] Update Administrator Success',
  UPDATE_ADMINISTRATOR_FAILURE = '[ADMINISTRATOR] Update Administrator Failure',

  CREATE_ADMINISTRATOR = '[ADMINISTRATOR] Create Administrator',
  CREATE_ADMINISTRATOR_SUCCESS = '[ADMINISTRATOR] Create Administrator Success',
  CREATE_ADMINISTRATOR_FAILURE = '[ADMINISTRATOR] Create Administrator Failure',

  INIT_ADMINISTRATOR = '[ADMINISTRATOR] Init Administrator'
}

export class GetAdministrators implements Action {
  readonly type = AdministratorActionsTypes.GET_ADMINISTRATORS;
}

export class GetAdministratorsSuccess implements Action {
  readonly type = AdministratorActionsTypes.GET_ADMINISTRATORS_SUCCESS;
  constructor(public payload: AdministratorResultsModel) {}
}
export class GetAdministratorsFailure implements Action {
  readonly type = AdministratorActionsTypes.GET_ADMINISTRATORS_FAILURE;
}

export class GetAdministrator implements Action {
  readonly type = AdministratorActionsTypes.GET_ADMINISTRATOR;
  constructor(public payload: string) {}
}
export class GetAdministratorSuccess implements Action {
  readonly type = AdministratorActionsTypes.GET_ADMINISTRATOR_SUCCESS;
  constructor(public payload: AdministratorResultModel) {}
}
export class GetAdministratorFailure implements Action {
  readonly type = AdministratorActionsTypes.GET_ADMINISTRATOR_FAILURE;
}

export class UpdateAdministrator implements Action {
  readonly type = AdministratorActionsTypes.UPDATE_ADMINISTRATOR;
  constructor(public payload: AdministratorModel) {}
}
export class UpdateAdministratorSuccess implements Action {
  readonly type = AdministratorActionsTypes.UPDATE_ADMINISTRATOR_SUCCESS;
  constructor(public payload: AdministratorResultModel) {}
}
export class UpdateAdministratorFailure implements Action {
  readonly type = AdministratorActionsTypes.UPDATE_ADMINISTRATOR_FAILURE;
}

export class CreateAdministrator implements Action {
  readonly type = AdministratorActionsTypes.CREATE_ADMINISTRATOR;
  constructor(public payload: AdministratorModel) {}
}
export class CreateAdministratorSuccess implements Action {
  readonly type = AdministratorActionsTypes.CREATE_ADMINISTRATOR_SUCCESS;
  constructor(public payload: AdministratorResultModel) {}
}
export class CreateAdministratorFailure implements Action {
  readonly type = AdministratorActionsTypes.CREATE_ADMINISTRATOR_FAILURE;
}

export class DeleteAdministrator implements Action {
  readonly type = AdministratorActionsTypes.DELETE_ADMINISTRATOR;
  constructor(public payload: number) {}
}
export class DeleteAdministratorSuccess implements Action {
  readonly type = AdministratorActionsTypes.DELETE_ADMINISTRATOR_SUCCESS;
  constructor(public payload: AdministratorResultModel) {}
}
export class DeleteAdministratorFailure implements Action {
  readonly type = AdministratorActionsTypes.DELETE_ADMINISTRATOR_FAILURE;
}

export class InitAdministrator implements Action {
  readonly type = AdministratorActionsTypes.INIT_ADMINISTRATOR;
}

export type AdministratorsActions =
  | GetAdministrators
  | GetAdministratorsSuccess
  | GetAdministratorsFailure
  | GetAdministrator
  | GetAdministratorSuccess
  | GetAdministratorFailure
  | UpdateAdministrator
  | UpdateAdministratorSuccess
  | UpdateAdministratorFailure
  | CreateAdministrator
  | CreateAdministratorSuccess
  | CreateAdministratorFailure
  | DeleteAdministrator
  | DeleteAdministratorSuccess
  | DeleteAdministratorFailure
  | InitAdministrator;
