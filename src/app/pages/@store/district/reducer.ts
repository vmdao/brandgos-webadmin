import { DistrictsActions } from './actions';
import { DistrictModel } from './model';
import { createReducer, on } from '@ngrx/store';

export enum DistrictModalStatus {
  Init = 0,
  Called = 1,
  Success = 2,
  Failure = 3,
}

export enum DistrictModalType {
  Create = 0,
  Edit = 1,
  View = 2,
}

const {
  getDistricts,
  getDistrictsFailure,
  getDistrictsSuccess,
  getDistrict,
  getDistrictFailure,
  getDistrictSuccess,
  createDistrict,
  createDistrictFailure,
  createDistrictSuccess,
  updateDistrict,
  updateDistrictFailure,
  updateDistrictSuccess,
  deleteDistrict,
  deleteDistrictFailure,
  deleteDistrictSuccess,
  openDistrictView,
} = DistrictsActions;
export interface DistrictState {
  list: Array<DistrictModel>;
  item: DistrictModel;
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
    type: DistrictModalType;
    data: any;
    isLoading: boolean;
    errors: Array<any>;
    status: DistrictModalStatus;
  };
}

export const initialState: DistrictState = {
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
    type: DistrictModalType.View,
    data: null,
    isLoading: false,
    errors: [],
    status: DistrictModalStatus.Init,
  },
};

export const reducer = createReducer(
  initialState,
  on(getDistricts, (state, { payload }) => {
    return { ...state, loading: true, params: { ...payload } };
  }),
  on(getDistrictsSuccess, (state, { payload }) => {
    return {
      ...state,
      list: [...payload.data],
      pagination: { ...payload.pagination },
      loading: false,
    };
  }),
  on(getDistrictsFailure, (state) => {
    return {
      ...state,
      loading: false,
    };
  }),
  on(updateDistrict, (state) => {
    const modal = {
      ...state.modal,
      isLoading: true,
      status: DistrictModalStatus.Called,
      type: DistrictModalType.Edit,
      errors: [],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(updateDistrictSuccess, (state) => {
    const modal = {
      ...state.modal,
      isLoading: false,
      status: DistrictModalStatus.Success,
    };
    return {
      ...state,
      modal,
    };
  }),
  on(updateDistrictFailure, (state, { payload }) => {
    const { validationErrors = [] } = payload;
    const modal = {
      ...state.modal,
      isLoading: false,
      status: DistrictModalStatus.Failure,
      errors: [...validationErrors],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(createDistrict, (state, { payload }) => {
    const modal = {
      ...state.modal,
      isLoading: true,
      status: DistrictModalStatus.Init,
      type: DistrictModalType.Create,
      errors: [],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(createDistrictSuccess, (state) => {
    const modal = {
      ...state.modal,
      isLoading: false,
      status: DistrictModalStatus.Success,
    };
    return {
      ...state,
      modal,
    };
  }),
  on(createDistrictFailure, (state, { payload }) => {
    const { validationErrors = [] } = payload;
    const modal = {
      ...state.modal,
      isLoading: false,
      status: DistrictModalStatus.Failure,
      errors: [...validationErrors],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(deleteDistrict, (state) => {
    return { ...state, loading: true };
  }),
  on(deleteDistrictSuccess, (state) => {
    return { ...state, loading: false };
  }),
  on(deleteDistrictFailure, (state) => {
    return { ...state, loading: false };
  }),
  on(openDistrictView, (state) => {
    const modal = {
      ...state.modal,
      status: DistrictModalStatus.Init,
      errors: [],
    };
    return {
      ...state,
      modal,
    };
  })
);
