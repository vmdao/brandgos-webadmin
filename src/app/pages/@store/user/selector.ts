import { createSelector } from '@ngrx/store';
import * as fromApp from '../reducers';
import * as fromAuthority from '../authority';
import * as fromUser from './';

export const getUserState = createSelector(
  fromApp.selectContainerState,
  (state: fromApp.AppState) => state.users
);

export const getUsers = createSelector(
  getUserState,
  (state: fromUser.UserState) => state.list
);

export const getUser = createSelector(
  getUserState,
  (state: fromUser.UserState) => state.item
);

export const getUsersPagination = createSelector(
  getUserState,
  (state: fromUser.UserState) => state.pagination
);

export const getUsersParams = createSelector(
  getUserState,
  (state: fromUser.UserState) => state.params
);

export const getUsersLoading = createSelector(
  getUserState,
  (state: fromUser.UserState) => state.loading
);

export const getUserView = createSelector(
  getUserState,
  (state: fromUser.UserState) => state.modal
);

export const getUserAuthorities = createSelector(
  getUserState,
  (state: fromUser.UserState) => state.authorities
);

export const getUserAuthoritiesWithAuthorities = createSelector(
  getUserAuthorities,
  fromAuthority.getAuthorities,
  (userAuthorities, authoritities) => {
    return authoritities.map(auth => {
      const found = userAuthorities.find(userAuthority => {
        return userAuthority.name === auth.name;
      });
      auth = { ...auth, do: found ? true : false };
      return auth;
    });
  }
);

export const getUserAuthoritiesLoading = createSelector(
  getUserState,
  (state: fromUser.UserState) => state.authoritiesLoading
);

export const getProfile = createSelector(
  getUserState,
  (state: fromUser.UserState) => state.profile
);

export const getProfileLoading = createSelector(
  getUserState,
  (state: fromUser.UserState) => state.profileLoading
);
export const updateProfilePasswordLoading = createSelector(
  getUserState,
  (state: fromUser.UserState) => state.profilePasswordLoading
);

export const getProfilePermissionsLoading = createSelector(
  getUserState,
  (state: fromUser.UserState) => state.profilePermissionsLoading
);
