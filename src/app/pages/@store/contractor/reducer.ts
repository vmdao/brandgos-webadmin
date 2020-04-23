import { ContractorsActions } from './actions';
import { ContractorModel } from './model';
import { createReducer, on } from '@ngrx/store';

export enum ContractorModalStatus {
  Init = 0,
  Called = 1,
  Success = 2,
  Failure = 3,
}

export enum ContractorModalType {
  Create = 0,
  Edit = 1,
  View = 2,
}

const {
  getContractors,
  getContractorsFailure,
  getContractorsSuccess,
  getContractor,
  getContractorFailure,
  getContractorSuccess,
  createContractor,
  createContractorFailure,
  createContractorSuccess,
  updateContractor,
  updateContractorFailure,
  updateContractorSuccess,
  deleteContractor,
  deleteContractorFailure,
  deleteContractorSuccess,
  openContractorView,
} = ContractorsActions;
export interface ContractorState {
  list: Array<ContractorModel>;
  item: ContractorModel;
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
    type: ContractorModalType;
    data: any;
    isLoading: boolean;
    errors: Array<any>;
    status: ContractorModalStatus;
  };
}

export const initialState: ContractorState = {
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
    type: ContractorModalType.View,
    data: null,
    isLoading: false,
    errors: [],
    status: ContractorModalStatus.Init,
  },
};

export const reducer = createReducer(
  initialState,
  on(getContractors, (state, { payload }) => {
    return { ...state, loading: true, params: { ...payload } };
  }),
  on(getContractorsSuccess, (state, { payload }) => {
    return {
      ...state,
      list: [...payload.data],
      pagination: { ...payload.pagination },
      loading: false,
    };
  }),
  on(getContractorsFailure, (state) => {
    return {
      ...state,
      loading: false,
    };
  }),
  on(updateContractor, (state) => {
    const modal = {
      ...state.modal,
      isLoading: true,
      status: ContractorModalStatus.Called,
      type: ContractorModalType.Edit,
      errors: [],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(updateContractorSuccess, (state) => {
    const modal = {
      ...state.modal,
      isLoading: false,
      status: ContractorModalStatus.Success,
    };
    return {
      ...state,
      modal,
    };
  }),
  on(updateContractorFailure, (state, { payload }) => {
    const { validationErrors = [] } = payload;
    const modal = {
      ...state.modal,
      isLoading: false,
      status: ContractorModalStatus.Failure,
      errors: [...validationErrors],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(createContractor, (state, { payload }) => {
    const modal = {
      ...state.modal,
      isLoading: true,
      status: ContractorModalStatus.Init,
      type: ContractorModalType.Create,
      errors: [],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(createContractorSuccess, (state) => {
    const modal = {
      ...state.modal,
      isLoading: false,
      status: ContractorModalStatus.Success,
    };
    return {
      ...state,
      modal,
    };
  }),
  on(createContractorFailure, (state, { payload }) => {
    const { validationErrors = [] } = payload;
    const modal = {
      ...state.modal,
      isLoading: false,
      status: ContractorModalStatus.Failure,
      errors: [...validationErrors],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(deleteContractor, (state) => {
    return { ...state, loading: true };
  }),
  on(deleteContractorSuccess, (state) => {
    return { ...state, loading: false };
  }),
  on(deleteContractorFailure, (state) => {
    return { ...state, loading: false };
  }),
  on(openContractorView, (state) => {
    const modal = {
      ...state.modal,
      status: ContractorModalStatus.Init,
      errors: [],
    };
    return {
      ...state,
      modal,
    };
  })
);
