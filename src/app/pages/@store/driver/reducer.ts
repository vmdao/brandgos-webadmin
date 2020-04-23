import { DriversActions } from './actions';
import { DriverModel } from './model';
import { createReducer, on } from '@ngrx/store';

export enum DriverModalStatus {
  Init = 0,
  Called = 1,
  Success = 2,
  Failure = 3,
}

export enum DriverModalType {
  Create = 0,
  Edit = 1,
  View = 2,
}

const {
  getDrivers,
  getDriversFailure,
  getDriversSuccess,
  getDriver,
  getDriverFailure,
  getDriverSuccess,
  createDriver,
  createDriverFailure,
  createDriverSuccess,
  updateDriver,
  updateDriverFailure,
  updateDriverSuccess,
  deleteDriver,
  deleteDriverFailure,
  deleteDriverSuccess,
  openDriverView,
} = DriversActions;
export interface DriverState {
  list: Array<DriverModel>;
  item: DriverModel;
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
    type: DriverModalType;
    data: any;
    isLoading: boolean;
    errors: Array<any>;
    status: DriverModalStatus;
  };
}

export const initialState: DriverState = {
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
    type: DriverModalType.View,
    data: null,
    isLoading: false,
    errors: [],
    status: DriverModalStatus.Init,
  },
};

export const reducer = createReducer(
  initialState,
  on(getDrivers, (state, { payload }) => {
    return { ...state, loading: true, params: { ...payload } };
  }),
  on(getDriversSuccess, (state, { payload }) => {
    return {
      ...state,
      list: [...payload.data],
      pagination: { ...payload.pagination },
      loading: false,
    };
  }),
  on(getDriversFailure, (state) => {
    return {
      ...state,
      loading: false,
    };
  }),
  on(updateDriver, (state) => {
    const modal = {
      ...state.modal,
      isLoading: true,
      status: DriverModalStatus.Called,
      type: DriverModalType.Edit,
      errors: [],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(updateDriverSuccess, (state) => {
    const modal = {
      ...state.modal,
      isLoading: false,
      status: DriverModalStatus.Success,
    };
    return {
      ...state,
      modal,
    };
  }),
  on(updateDriverFailure, (state, { payload }) => {
    const { validationErrors = [] } = payload;
    const modal = {
      ...state.modal,
      isLoading: false,
      status: DriverModalStatus.Failure,
      errors: [...validationErrors],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(createDriver, (state, { payload }) => {
    const modal = {
      ...state.modal,
      isLoading: true,
      status: DriverModalStatus.Init,
      type: DriverModalType.Create,
      errors: [],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(createDriverSuccess, (state) => {
    const modal = {
      ...state.modal,
      isLoading: false,
      status: DriverModalStatus.Success,
    };
    return {
      ...state,
      modal,
    };
  }),
  on(createDriverFailure, (state, { payload }) => {
    const { validationErrors = [] } = payload;
    const modal = {
      ...state.modal,
      isLoading: false,
      status: DriverModalStatus.Failure,
      errors: [...validationErrors],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(deleteDriver, (state) => {
    return { ...state, loading: true };
  }),
  on(deleteDriverSuccess, (state) => {
    return { ...state, loading: false };
  }),
  on(deleteDriverFailure, (state) => {
    return { ...state, loading: false };
  }),
  on(openDriverView, (state) => {
    const modal = {
      ...state.modal,
      status: DriverModalStatus.Init,
      errors: [],
    };
    return {
      ...state,
      modal,
    };
  })
);
