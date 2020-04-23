import { createAction, props } from '@ngrx/store';

import { AuthorityModel } from './model';
import {
  AuthorityResultsModel,
  AuthorityResultModel,
  AuthorityPermissionsResultModel,
  AppEntitiesResultModel,
} from './results.model';

const getAuthorities = createAction(
  '[AUTHORITY] Get Authorities',
  props<{ payload: any }>()
);

const getAuthoritiesuccess = createAction(
  '[AUTHORITY] Get Authorities Success',
  props<{ payload: AuthorityResultsModel }>()
);

export const getAuthoritiesFailure = createAction(
  '[AUTHORITY] Get Authorities Faild'
);

const getAuthority = createAction(
  '[AUTHORITY] Get Authority',
  props<{ payload: any }>()
);

const getAuthoritySuccess = createAction(
  '[AUTHORITY] Get Authority Success',
  props<{ payload: AuthorityResultModel }>()
);

export const getAuthorityFailure = createAction(
  '[AUTHORITY] Get Authority Faild'
);

const createAuthority = createAction(
  '[AUTHORITY] Create Authority',
  props<{ payload: AuthorityModel }>()
);

const createAuthoritySuccess = createAction(
  '[AUTHORITY] Create Authority Success',
  props<{ payload: AuthorityResultModel }>()
);

export const createAuthorityFailure = createAction(
  '[AUTHORITY] Create Authority Faild',
  props<{ payload: AuthorityResultModel }>()
);

const updateAuthority = createAction(
  '[AUTHORITY] Update Authority',
  props<{ payload: AuthorityModel }>()
);

const updateAuthoritySuccess = createAction(
  '[AUTHORITY] Update Authority Success',
  props<{ payload: AuthorityResultModel }>()
);

export const updateAuthorityFailure = createAction(
  '[AUTHORITY] Update Authority Faild',
  props<{ payload: AuthorityResultModel }>()
);

const deleteAuthority = createAction(
  '[AUTHORITY] Delete Authority',
  props<{ payload: number }>()
);

const deleteAuthoritySuccess = createAction(
  '[AUTHORITY] Delete Authority Success',
  props<{ payload: AuthorityResultModel }>()
);

export const deleteAuthorityFailure = createAction(
  '[AUTHORITY] Delete Authority Faild',
  props<{ payload: AuthorityResultModel }>()
);

export const openAuthorityView = createAction(
  '[AUTHORITY] Open Authority View'
);

const getAuthorityPermissions = createAction(
  '[AUTHORITY] Get Authority Permissions',
  props<{ payload: any }>()
);

const getAuthorityPermissionsSuccess = createAction(
  '[AUTHORITY] Get Authority Permissions Success',
  props<{ payload: AuthorityPermissionsResultModel }>()
);

export const getAuthorityPermissionsFailure = createAction(
  '[AUTHORITY] Get Authority Permissions Faild'
);

const getAppEntities = createAction('[AUTHORITY] Get App Entities');

const getAppEntitiesSuccess = createAction(
  '[AUTHORITY] Get App Entities Success',
  props<{ payload: AppEntitiesResultModel }>()
);

export const getAppEntitiesFailure = createAction(
  '[AUTHORITY] Get App Entities Faild'
);

export const AuthoritiesActions = {
  openAuthorityView,
  getAppEntities,
  getAppEntitiesSuccess,
  getAppEntitiesFailure,
  getAuthorities,
  getAuthoritiesuccess,
  getAuthoritiesFailure,
  getAuthority,
  getAuthoritySuccess,
  getAuthorityFailure,
  createAuthority,
  createAuthoritySuccess,
  createAuthorityFailure,
  updateAuthority,
  updateAuthoritySuccess,
  updateAuthorityFailure,
  deleteAuthority,
  deleteAuthoritySuccess,
  deleteAuthorityFailure,
  getAuthorityPermissions,
  getAuthorityPermissionsSuccess,
  getAuthorityPermissionsFailure,
};
