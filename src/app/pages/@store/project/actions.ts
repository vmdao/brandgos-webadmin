import { createAction, props } from '@ngrx/store';

import { ProjectModel } from './model';
import { ProjectResultsModel, ProjectResultModel } from './results.model';

const getProjects = createAction(
  '[PROJECT] Get Projects',
  props<{ payload: any }>()
);

const getProjectsSuccess = createAction(
  '[PROJECT] Get Projects Success',
  props<{ payload: ProjectResultsModel }>()
);

export const getProjectsFailure = createAction('[PROJECT] Get Projects Faild');

const getProject = createAction(
  '[PROJECT] Get Project',
  props<{ payload: any }>()
);

const getProjectSuccess = createAction(
  '[PROJECT] Get Project Success',
  props<{ payload: ProjectResultModel }>()
);

export const getProjectFailure = createAction('[PROJECT] Get Project Faild');

const createProject = createAction(
  '[PROJECT] Create Project',
  props<{ payload: ProjectModel }>()
);

const createProjectSuccess = createAction(
  '[PROJECT] Create Project Success',
  props<{ payload: ProjectResultModel }>()
);

export const createProjectFailure = createAction(
  '[PROJECT] Create Project Faild',
  props<{ payload: ProjectResultModel }>()
);

const updateProject = createAction(
  '[PROJECT] Update Project',
  props<{ payload: ProjectModel }>()
);

const updateProjectSuccess = createAction(
  '[PROJECT] Update Project Success',
  props<{ payload: ProjectResultModel }>()
);

export const updateProjectFailure = createAction(
  '[PROJECT] Update Project Faild',
  props<{ payload: ProjectResultModel }>()
);

const deleteProject = createAction(
  '[PROJECT] Delete Project',
  props<{ payload: number }>()
);

const deleteProjectSuccess = createAction(
  '[PROJECT] Delete Project Success',
  props<{ payload: ProjectResultModel }>()
);

export const deleteProjectFailure = createAction(
  '[PROJECT] Delete Project Faild',
  props<{ payload: ProjectResultModel }>()
);

export const openProjectView = createAction('[PROJECT] Open Project View');

export const ProjectsActions = {
  openProjectView,
  getProjects,
  getProjectsSuccess,
  getProjectsFailure,
  getProject,
  getProjectSuccess,
  getProjectFailure,
  createProject,
  createProjectSuccess,
  createProjectFailure,
  updateProject,
  updateProjectSuccess,
  updateProjectFailure,
  deleteProject,
  deleteProjectSuccess,
  deleteProjectFailure,
};
