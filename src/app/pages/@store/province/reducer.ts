import { ProvincesActions } from './actions';
import { ProvinceModel } from './model';
import { createReducer, on } from '@ngrx/store';
import { DistrictModel } from '../district';

export enum ProvinceModalStatus {
  Init = 0,
  Called = 1,
  Success = 2,
  Failure = 3,
}

export enum ProvinceModalType {
  Create = 0,
  Edit = 1,
  View = 2,
}

const {
  getProvinces,
  getProvincesFailure,
  getProvincesSuccess,
  getProvince,
  getProvinceFailure,
  getProvinceSuccess,
  createProvince,
  createProvinceFailure,
  createProvinceSuccess,
  updateProvince,
  updateProvinceFailure,
  updateProvinceSuccess,
  deleteProvince,
  deleteProvinceFailure,
  deleteProvinceSuccess,
  openProvinceView,
  getProvinceDistricts,
  getProvinceDistrictsSuccess,
  getProvinceDistrictsFailure,
} = ProvincesActions;
export interface ProvinceState {
  list: Array<ProvinceModel>;
  item: ProvinceModel;
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
    type: ProvinceModalType;
    data: any;
    isLoading: boolean;
    errors: Array<any>;
    status: ProvinceModalStatus;
  };
  districts: Array<DistrictModel>;
  districtsLoading: boolean;
}

export const initialState: ProvinceState = {
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
    type: ProvinceModalType.View,
    data: null,
    isLoading: false,
    errors: [],
    status: ProvinceModalStatus.Init,
  },
  districts: [],
  districtsLoading: false,
};

export const reducer = createReducer(
  initialState,
  on(getProvinces, (state, { payload }) => {
    return { ...state, loading: true, params: { ...payload } };
  }),
  on(getProvincesSuccess, (state, { payload }) => {
    return {
      ...state,
      list: [...payload.data],
      pagination: { ...payload.pagination },
      loading: false,
    };
  }),
  on(getProvincesFailure, (state) => {
    return {
      ...state,
      loading: false,
    };
  }),
  on(updateProvince, (state) => {
    const modal = {
      ...state.modal,
      isLoading: true,
      status: ProvinceModalStatus.Called,
      type: ProvinceModalType.Edit,
      errors: [],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(updateProvinceSuccess, (state) => {
    const modal = {
      ...state.modal,
      isLoading: false,
      status: ProvinceModalStatus.Success,
    };
    return {
      ...state,
      modal,
    };
  }),
  on(updateProvinceFailure, (state, { payload }) => {
    const { validationErrors = [] } = payload;
    const modal = {
      ...state.modal,
      isLoading: false,
      status: ProvinceModalStatus.Failure,
      errors: [...validationErrors],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(createProvince, (state, { payload }) => {
    const modal = {
      ...state.modal,
      isLoading: true,
      status: ProvinceModalStatus.Init,
      type: ProvinceModalType.Create,
      errors: [],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(createProvinceSuccess, (state) => {
    const modal = {
      ...state.modal,
      isLoading: false,
      status: ProvinceModalStatus.Success,
    };
    return {
      ...state,
      modal,
    };
  }),
  on(createProvinceFailure, (state, { payload }) => {
    const { validationErrors = [] } = payload;
    const modal = {
      ...state.modal,
      isLoading: false,
      status: ProvinceModalStatus.Failure,
      errors: [...validationErrors],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(deleteProvince, (state) => {
    return { ...state, loading: true };
  }),
  on(deleteProvinceSuccess, (state) => {
    return { ...state, loading: false };
  }),
  on(deleteProvinceFailure, (state) => {
    return { ...state, loading: false };
  }),
  on(openProvinceView, (state) => {
    const modal = {
      ...state.modal,
      status: ProvinceModalStatus.Init,
      errors: [],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(getProvinceDistricts, (state) => {
    return { ...state, districtsLoading: true };
  }),
  on(getProvinceDistrictsSuccess, (state, { payload }) => {
    return {
      ...state,
      districts: [...payload.data],
      districtsLoading: false,
    };
  }),
  on(getProvinceDistrictsFailure, (state) => {
    return {
      ...state,
      districts: [],
      districtsLoading: false,
    };
  })
);
