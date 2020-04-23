import { LorriesActions } from './actions';
import { LorryModel } from './model';
import { createReducer, on } from '@ngrx/store';

export enum LorryModalStatus {
  Init = 0,
  Called = 1,
  Success = 2,
  Failure = 3,
}

export enum LorryModalType {
  Create = 0,
  Edit = 1,
  View = 2,
}

const {
  getLorries,
  getLorriesFailure,
  getLorriesSuccess,
  getLorry,
  getLorryFailure,
  getLorriesuccess,
  createLorry,
  createLorryFailure,
  createLorrySuccess,
  updateLorry,
  updateLorryFailure,
  updateLorrySuccess,
  deleteLorry,
  deleteLorryFailure,
  deleteLorrySuccess,
  openLorryView,
} = LorriesActions;
export interface LorryState {
  list: Array<LorryModel>;
  item: LorryModel;
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
    plateNumber?: string;
    fullName?: string;
  };
  loading: boolean;
  modal: {
    type: LorryModalType;
    data: any;
    isLoading: boolean;
    errors: Array<any>;
    status: LorryModalStatus;
  };
}

export const initialState: LorryState = {
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
    plateNumber: null,
  },
  loading: false,
  modal: {
    type: LorryModalType.View,
    data: null,
    isLoading: false,
    errors: [],
    status: LorryModalStatus.Init,
  },
};

export const reducer = createReducer(
  initialState,
  on(getLorries, (state, { payload }) => {
    return { ...state, loading: true, params: { ...payload } };
  }),
  on(getLorriesSuccess, (state, { payload }) => {
    return {
      ...state,
      list: [...payload.data],
      pagination: { ...payload.pagination },
      loading: false,
    };
  }),
  on(getLorriesFailure, (state) => {
    return {
      ...state,
      loading: false,
    };
  }),
  on(updateLorry, (state) => {
    const modal = {
      ...state.modal,
      isLoading: true,
      status: LorryModalStatus.Called,
      type: LorryModalType.Edit,
      errors: [],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(updateLorrySuccess, (state) => {
    const modal = {
      ...state.modal,
      isLoading: false,
      status: LorryModalStatus.Success,
    };
    return {
      ...state,
      modal,
    };
  }),
  on(updateLorryFailure, (state, { payload }) => {
    const { validationErrors = [] } = payload;
    const modal = {
      ...state.modal,
      isLoading: false,
      status: LorryModalStatus.Failure,
      errors: [...validationErrors],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(createLorry, (state, { payload }) => {
    const modal = {
      ...state.modal,
      isLoading: true,
      status: LorryModalStatus.Init,
      type: LorryModalType.Create,
      errors: [],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(createLorrySuccess, (state) => {
    const modal = {
      ...state.modal,
      isLoading: false,
      status: LorryModalStatus.Success,
    };
    return {
      ...state,
      modal,
    };
  }),
  on(createLorryFailure, (state, { payload }) => {
    const { validationErrors = [] } = payload;
    const modal = {
      ...state.modal,
      isLoading: false,
      status: LorryModalStatus.Failure,
      errors: [...validationErrors],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(deleteLorry, (state) => {
    return { ...state, loading: true };
  }),
  on(deleteLorrySuccess, (state) => {
    return { ...state, loading: false };
  }),
  on(deleteLorryFailure, (state) => {
    return { ...state, loading: false };
  }),
  on(openLorryView, (state) => {
    const modal = {
      ...state.modal,
      status: LorryModalStatus.Init,
      errors: [],
    };
    return {
      ...state,
      modal,
    };
  })
);
