import { createSelector } from '@ngrx/store';
import * as fromApp from '../reducers';
import * as fromProject from './';

export const getProjectState = createSelector(
  fromApp.selectContainerState,
  (state: fromApp.AppState) => state.projects
);

export const getProjects = createSelector(
  getProjectState,
  (state: fromProject.ProjectState) => state.list
);

export const getProject = createSelector(
  getProjectState,
  (state: fromProject.ProjectState) => state.item
);

export const getProjectsPagination = createSelector(
  getProjectState,
  (state: fromProject.ProjectState) => state.pagination
);

export const getProjectsParams = createSelector(
  getProjectState,
  (state: fromProject.ProjectState) => state.params
);

export const getProjectsLoading = createSelector(
  getProjectState,
  (state: fromProject.ProjectState) => state.loading
);

export const getProjectView = createSelector(
  getProjectState,
  (state: fromProject.ProjectState) => state.modal
);
