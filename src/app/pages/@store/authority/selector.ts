import { createSelector } from '@ngrx/store';
import * as fromApp from '../reducers';
import * as fromAuthorities from './';

export const getAuthorityState = createSelector(
  fromApp.selectContainerState,
  (state: fromApp.AppState) => state.authorities
);

export const getAuthorities = createSelector(
  getAuthorityState,
  (state: fromAuthorities.AuthorityState) => state.list
);

export const getAuthority = createSelector(
  getAuthorityState,
  (state: fromAuthorities.AuthorityState) => state.item
);

export const getAuthoritiesPagination = createSelector(
  getAuthorityState,
  (state: fromAuthorities.AuthorityState) => state.pagination
);

export const getAuthoritiesLoading = createSelector(
  getAuthorityState,
  (state: fromAuthorities.AuthorityState) => state.loading
);

export const getAuthoritiesView = createSelector(
  getAuthorityState,
  (state: fromAuthorities.AuthorityState) => state.modal
);

export const getAuthorityPermissions = createSelector(
  getAuthorityState,
  (state: fromAuthorities.AuthorityState) => state.permissions
);

function grouById(collection) {
  return collection.reduce((r, a) => {
    r[a.appEntityId] = [...(r[a.appEntityId] || []), a];
    return r;
  }, {});
}
export const getAuthoritiesWithPermissions = createSelector(
  getAuthorities,
  getAuthorityPermissions,
  (authorities, authorityPermissions) => {
    const authorityPermissionsGroup = grouById(authorityPermissions);

    return authorities.map(auth => {
      const newAuthority = {
        appEntityId: auth.id,
        name: auth.name,
        read: false,
        create: false,
        update: false,
        delete: false
      };

      const found = authorityPermissionsGroup[newAuthority.appEntityId];

      if (found) {
        found.forEach(f => {
          switch (f.action) {
            case 'r':
              newAuthority.read = true;
              break;
            case 'c':
              newAuthority.create = true;
              break;
            case 'u':
              newAuthority.update = true;
              break;
            case 'd':
              newAuthority.delete = true;
              break;
          }
        });
      }

      return { ...newAuthority };
    });
  }
);

export const getPermissionsLoading = createSelector(
  getAuthorityState,
  (state: fromAuthorities.AuthorityState) => state.permissionsLoading
);
export const getAppEntities = createSelector(
  getAuthorityState,
  (state: fromAuthorities.AuthorityState) => state.appEntities
);
export const getAppEntitiesLoading = createSelector(
  getAuthorityState,
  (state: fromAuthorities.AuthorityState) => state.appEntitiesLoading
);

export const getAppEntitiesWithPermissions = createSelector(
  getAppEntities,
  getAuthorityPermissions,
  (appEntities, authorityPermissions) => {
    const appEntityPermissionsGroup = grouById(authorityPermissions);

    return appEntities.map(auth => {
      const newAppEntity = {
        appEntityId: auth.id,
        name: auth.name,
        read: false,
        create: false,
        update: false,
        delete: false
      };

      const found = appEntityPermissionsGroup[newAppEntity.appEntityId];

      if (found) {
        found.forEach(f => {
          switch (f.action) {
            case 'r':
              newAppEntity.read = true;
              break;
            case 'c':
              newAppEntity.create = true;
              break;
            case 'u':
              newAppEntity.update = true;
              break;
            case 'd':
              newAppEntity.delete = true;
              break;
          }
        });
      }
      return { ...newAppEntity };
    });
  }
);
