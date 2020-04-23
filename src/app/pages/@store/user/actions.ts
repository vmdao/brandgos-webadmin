import { createAction, props } from '@ngrx/store';

import { UserModel, PasswordModel } from './model';
import { UserResultsModel, UserResultModel } from './results.model';
import {
  AuthorityResultsModel,
  AuthorityPermissionsResultModel,
} from '../authority';

const getUsers = createAction('[USER] Get Users', props<{ payload: any }>());

const getUsersSuccess = createAction(
  '[USER] Get Users Success',
  props<{ payload: UserResultsModel }>()
);

export const getUsersFailure = createAction('[USER] Get Users Faild');

const getUser = createAction('[USER] Get User', props<{ payload: any }>());

const getUserSuccess = createAction(
  '[USER] Get User Success',
  props<{ payload: UserResultModel }>()
);

export const getUserFailure = createAction('[USER] Get User Faild');

const createUser = createAction(
  '[USER] Create User',
  props<{ payload: UserModel }>()
);

const createUserSuccess = createAction(
  '[USER] Create User Success',
  props<{ payload: UserResultModel }>()
);

export const createUserFailure = createAction(
  '[USER] Create User Faild',
  props<{ payload: UserResultModel }>()
);

const updateUser = createAction(
  '[USER] Update User',
  props<{ payload: UserModel }>()
);

const updateUserSuccess = createAction(
  '[USER] Update User Success',
  props<{ payload: UserResultModel }>()
);

export const updateUserFailure = createAction(
  '[USER] Update User Faild',
  props<{ payload: UserResultModel }>()
);

const deleteUser = createAction(
  '[USER] Delete User',
  props<{ payload: number }>()
);

const deleteUserSuccess = createAction(
  '[USER] Delete User Success',
  props<{ payload: UserResultModel }>()
);
export const openUserView = createAction('[User] Open User View');
export const deleteUserFailure = createAction(
  '[USER] Delete User Faild',
  props<{ payload: UserResultModel }>()
);

const getUserAuthorities = createAction(
  '[USER] Get User Authorities',
  props<{ payload: any }>()
);

const getUserAuthoritiesSuccess = createAction(
  '[USER] Get User Authorities Success',
  props<{ payload: AuthorityResultsModel }>()
);

export const getUserAuthoritiesFailure = createAction(
  '[USER] Get User Authorities Faild'
);

const getProfile = createAction('[USER] Get Profile');

const getProfileSuccess = createAction(
  '[USER] Get Profile Success',
  props<{ payload: UserResultModel }>()
);

export const getProfileFailure = createAction('[USER] Get Profile Faild');

const updateProfilePassword = createAction(
  '[USER] Update User Profile Password',
  props<{ payload: PasswordModel }>()
);

const updateProfilePasswordSuccess = createAction(
  '[USER] Update User Profile Password Success',
  props<{ payload: UserResultModel }>()
);

export const updateProfilePasswordFailure = createAction(
  '[USER] Update User Profile Password Faild'
);

const getProfilePermissions = createAction('[USER] Get Profile Permissions');

const getProfilePermissionsSuccess = createAction(
  '[USER] Get Profile Permissions Success',
  props<{ payload: AuthorityPermissionsResultModel }>()
);

export const getProfilePermissionsFailure = createAction(
  '[USER] Get Profile Permissions Faild'
);

export const UsersActions = {
  openUserView,
  getProfilePermissions,
  getProfilePermissionsSuccess,
  getProfilePermissionsFailure,
  getUsers,
  getUsersSuccess,
  getUsersFailure,
  getUser,
  getUserSuccess,
  getUserFailure,
  createUser,
  createUserSuccess,
  createUserFailure,
  updateUser,
  updateUserSuccess,
  updateUserFailure,
  deleteUser,
  deleteUserSuccess,
  deleteUserFailure,
  getUserAuthorities,
  getUserAuthoritiesSuccess,
  getUserAuthoritiesFailure,
  getProfile,
  getProfileSuccess,
  getProfileFailure,
  updateProfilePassword,
  updateProfilePasswordSuccess,
  updateProfilePasswordFailure,
};
