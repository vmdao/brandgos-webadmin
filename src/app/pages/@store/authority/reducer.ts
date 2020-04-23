import { AuthoritiesActions } from './actions';
import {
  AuthorityModel,
  AuthorityPermissionsModel,
  AppEntityModel,
} from './model';
import { createReducer, on } from '@ngrx/store';

export enum AuthorityModalStatus {
  Init = 0,
  Called = 1,
  Success = 2,
  Failure = 3,
}

export enum AuthorityModalType {
  Create = 0,
  Edit = 1,
  View = 2,
}

const {
  getAuthorities,
  getAuthoritiesFailure,
  getAuthoritiesuccess,
  getAuthority,
  getAuthorityFailure,
  getAuthoritySuccess,
  createAuthority,
  createAuthorityFailure,
  createAuthoritySuccess,
  updateAuthority,
  updateAuthorityFailure,
  updateAuthoritySuccess,
  deleteAuthority,
  deleteAuthorityFailure,
  deleteAuthoritySuccess,
  getAuthorityPermissions,
  getAuthorityPermissionsSuccess,
  getAuthorityPermissionsFailure,
  getAppEntities,
  getAppEntitiesSuccess,
  getAppEntitiesFailure,
  openAuthorityView,
} = AuthoritiesActions;
export interface AuthorityState {
  list: Array<AuthorityModel>;
  item: AuthorityModel;
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
    id: number;
    type: AuthorityModalType;
    data: any;
    isLoading: boolean;
    errors: Array<any>;
    status: AuthorityModalStatus;
  };
  permissions: Array<AuthorityPermissionsModel>;
  permissionsLoading: boolean;
  appEntities: Array<AppEntityModel>;
  appEntitiesLoading: boolean;
}

export const initialState: AuthorityState = {
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
    id: null,
    type: AuthorityModalType.View,
    data: null,
    isLoading: false,
    errors: [],
    status: AuthorityModalStatus.Init,
  },
  permissions: [],
  permissionsLoading: false,
  appEntities: [],
  appEntitiesLoading: false,
};

export const reducer = createReducer(
  initialState,
  on(getAuthorities, (state, { payload }) => {
    return { ...state, loading: true, params: { ...payload } };
  }),
  on(getAuthoritiesuccess, (state, { payload }) => {
    return {
      ...state,
      list: [...payload.data],
      pagination: { ...payload.pagination },
      loading: false,
    };
  }),
  on(getAuthoritiesFailure, (state) => {
    return {
      ...state,
      loading: false,
    };
  }),
  on(updateAuthority, (state) => {
    const modal = {
      ...state.modal,
      isLoading: true,
      status: AuthorityModalStatus.Called,
      type: AuthorityModalType.Edit,
      errors: [],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(updateAuthoritySuccess, (state) => {
    const modal = {
      ...state.modal,
      isLoading: false,
      status: AuthorityModalStatus.Success,
    };
    return {
      ...state,
      modal,
    };
  }),
  on(updateAuthorityFailure, (state, { payload }) => {
    const { validationErrors = [] } = payload;
    const modal = {
      ...state.modal,
      isLoading: false,
      status: AuthorityModalStatus.Failure,
      errors: [...validationErrors],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(createAuthority, (state) => {
    const modal = {
      ...state.modal,
      isLoading: true,
      status: AuthorityModalStatus.Init,
      type: AuthorityModalType.Create,
      errors: [],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(createAuthoritySuccess, (state) => {
    const modal = {
      ...state.modal,
      isLoading: false,
      status: AuthorityModalStatus.Success,
    };
    return {
      ...state,
      modal,
    };
  }),
  on(createAuthorityFailure, (state, { payload }) => {
    const { validationErrors = [] } = payload;
    const modal = {
      ...state.modal,
      isLoading: false,
      status: AuthorityModalStatus.Failure,
      errors: [...validationErrors],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(updateAuthority, (state, { payload }) => {
    const modal = {
      ...state.modal,
      id: payload.id,
      isLoading: true,
      status: AuthorityModalStatus.Init,
      type: AuthorityModalType.Edit,
      errors: [],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(updateAuthoritySuccess, (state) => {
    const modal = {
      ...state.modal,
      isLoading: false,
      status: AuthorityModalStatus.Success,
    };
    return {
      ...state,
      modal,
    };
  }),
  on(updateAuthorityFailure, (state, { payload }) => {
    const { validationErrors = [] } = payload;
    const modal = {
      ...state.modal,
      isLoading: false,
      status: AuthorityModalStatus.Failure,
      errors: [...validationErrors],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(deleteAuthority, (state) => {
    return { ...state, loading: true };
  }),
  on(deleteAuthoritySuccess, (state) => {
    return { ...state, loading: false };
  }),
  on(deleteAuthorityFailure, (state) => {
    return { ...state, loading: false };
  }),
  on(openAuthorityView, (state) => {
    const modal = {
      ...state.modal,
      status: AuthorityModalStatus.Init,
      errors: [],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(getAuthorityPermissions, (state) => {
    return { ...state, permissionsLoading: true };
  }),
  on(getAuthorityPermissionsSuccess, (state, { payload }) => {
    return {
      ...state,
      permissions: [...payload.data],
      permissionsLoading: false,
    };
  }),
  on(getAuthorityPermissionsFailure, (state) => {
    return {
      ...state,
      permissionsLoading: false,
    };
  }),
  on(getAppEntities, (state) => {
    return { ...state, appEntitiesLoading: true };
  }),
  on(getAppEntitiesSuccess, (state, { payload }) => {
    return {
      ...state,
      appEntities: [...payload.data],
      appEntitiesLoading: false,
    };
  }),
  on(getAppEntitiesFailure, (state) => {
    return {
      ...state,
      appEntitiesLoading: false,
    };
  })
);
