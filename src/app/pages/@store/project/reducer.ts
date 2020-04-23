import { ProjectsActions } from './actions';
import { ProjectModel } from './model';
import { createReducer, on } from '@ngrx/store';

export enum ProjectModalStatus {
  Init = 0,
  Called = 1,
  Success = 2,
  Failure = 3,
}

export enum ProjectModalType {
  Create = 0,
  Edit = 1,
  View = 2,
}

const {
  getProjects,
  getProjectsFailure,
  getProjectsSuccess,
  getProject,
  getProjectFailure,
  getProjectSuccess,
  createProject,
  createProjectFailure,
  createProjectSuccess,
  updateProject,
  updateProjectFailure,
  updateProjectSuccess,
  deleteProject,
  deleteProjectFailure,
  deleteProjectSuccess,
  openProjectView,
} = ProjectsActions;
export interface ProjectState {
  list: Array<ProjectModel>;
  item: ProjectModel;
  pagination: {
    page: number;
    size: number;
    totalRecords: number;
  };
  params: {
    page?: number;
    size?: number;
    sort?: string;
    search?: string;
    name?: string;
    fullName?: string;
  };
  loading: boolean;
  modal: {
    type: ProjectModalType;
    data: any;
    isLoading: boolean;
    errors: Array<any>;
    status: ProjectModalStatus;
  };
}

export const initialState: ProjectState = {
  list: [],
  item: null,
  pagination: {
    page: 0,
    size: 10,
    totalRecords: 0,
  },
  params: {
    page: 0,
    size: 10,
    sort: null,
    search: null,
    fullName: null,
    name: null,
  },
  loading: false,
  modal: {
    type: ProjectModalType.View,
    data: null,
    isLoading: false,
    errors: [],
    status: ProjectModalStatus.Init,
  },
};

export const reducer = createReducer(
  initialState,
  on(getProjects, (state, { payload }) => {
    return { ...state, loading: true, params: { ...payload } };
  }),
  on(getProjectsSuccess, (state, { payload }) => {
    return {
      ...state,
      list: [...payload.data],
      pagination: { ...payload.pagination },
      loading: false,
    };
  }),
  on(getProjectsFailure, (state) => {
    return {
      ...state,
      loading: false,
    };
  }),
  on(updateProject, (state) => {
    const modal = {
      ...state.modal,
      isLoading: true,
      status: ProjectModalStatus.Called,
      type: ProjectModalType.Edit,
      errors: [],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(updateProjectSuccess, (state) => {
    const modal = {
      ...state.modal,
      isLoading: false,
      status: ProjectModalStatus.Success,
    };
    return {
      ...state,
      modal,
    };
  }),
  on(updateProjectFailure, (state, { payload }) => {
    const { validationErrors = [] } = payload;
    const modal = {
      ...state.modal,
      isLoading: false,
      status: ProjectModalStatus.Failure,
      errors: [...validationErrors],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(createProject, (state, { payload }) => {
    const modal = {
      ...state.modal,
      isLoading: true,
      status: ProjectModalStatus.Init,
      type: ProjectModalType.Create,
      errors: [],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(createProjectSuccess, (state) => {
    const modal = {
      ...state.modal,
      isLoading: false,
      status: ProjectModalStatus.Success,
    };
    return {
      ...state,
      modal,
    };
  }),
  on(createProjectFailure, (state, { payload }) => {
    const { validationErrors = [] } = payload;
    const modal = {
      ...state.modal,
      isLoading: false,
      status: ProjectModalStatus.Failure,
      errors: [...validationErrors],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(deleteProject, (state) => {
    return { ...state, loading: true };
  }),
  on(deleteProjectSuccess, (state) => {
    return { ...state, loading: false };
  }),
  on(deleteProjectFailure, (state) => {
    return { ...state, loading: false };
  }),
  on(openProjectView, (state) => {
    const modal = {
      ...state.modal,
      status: ProjectModalStatus.Init,
      errors: [],
    };
    return {
      ...state,
      modal,
    };
  })
);
