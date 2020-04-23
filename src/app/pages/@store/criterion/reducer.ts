import { CriterionsActions } from './actions';
import { CriterionModel } from './model';
import { createReducer, on } from '@ngrx/store';

export enum CriterionModalStatus {
  Init = 0,
  Called = 1,
  Success = 2,
  Failure = 3,
}

export enum CriterionModalType {
  Create = 0,
  Edit = 1,
  View = 2,
}

const {
  getCriterions,
  getCriterionsFailure,
  getCriterionsSuccess,
  getCriterion,
  getCriterionFailure,
  getCriterionSuccess,
  createCriterion,
  createCriterionFailure,
  createCriterionSuccess,
  updateCriterion,
  updateCriterionFailure,
  updateCriterionSuccess,
  deleteCriterion,
  deleteCriterionFailure,
  deleteCriterionSuccess,
  openCriterionView,
} = CriterionsActions;
export interface CriterionState {
  list: Array<CriterionModel>;
  item: CriterionModel;
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
    type: CriterionModalType;
    data: any;
    isLoading: boolean;
    errors: Array<any>;
    status: CriterionModalStatus;
  };
}

export const initialState: CriterionState = {
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
    type: CriterionModalType.View,
    data: null,
    isLoading: false,
    errors: [],
    status: CriterionModalStatus.Init,
  },
};

export const reducer = createReducer(
  initialState,
  on(getCriterions, (state, { payload }) => {
    return { ...state, loading: true, params: { ...payload } };
  }),
  on(getCriterionsSuccess, (state, { payload }) => {
    return {
      ...state,
      list: [...payload.data],
      pagination: { ...payload.pagination },
      loading: false,
    };
  }),
  on(getCriterionsFailure, (state) => {
    return {
      ...state,
      loading: false,
    };
  }),
  on(updateCriterion, (state) => {
    const modal = {
      ...state.modal,
      isLoading: true,
      status: CriterionModalStatus.Called,
      type: CriterionModalType.Edit,
      errors: [],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(updateCriterionSuccess, (state) => {
    const modal = {
      ...state.modal,
      isLoading: false,
      status: CriterionModalStatus.Success,
    };
    return {
      ...state,
      modal,
    };
  }),
  on(updateCriterionFailure, (state, { payload }) => {
    const { validationErrors = [] } = payload;
    const modal = {
      ...state.modal,
      isLoading: false,
      status: CriterionModalStatus.Failure,
      errors: [...validationErrors],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(createCriterion, (state, { payload }) => {
    const modal = {
      ...state.modal,
      isLoading: true,
      status: CriterionModalStatus.Init,
      type: CriterionModalType.Create,
      errors: [],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(createCriterionSuccess, (state) => {
    const modal = {
      ...state.modal,
      isLoading: false,
      status: CriterionModalStatus.Success,
    };
    return {
      ...state,
      modal,
    };
  }),
  on(createCriterionFailure, (state, { payload }) => {
    const { validationErrors = [] } = payload;
    const modal = {
      ...state.modal,
      isLoading: false,
      status: CriterionModalStatus.Failure,
      errors: [...validationErrors],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(deleteCriterion, (state) => {
    return { ...state, loading: true };
  }),
  on(deleteCriterionSuccess, (state) => {
    return { ...state, loading: false };
  }),
  on(deleteCriterionFailure, (state) => {
    return { ...state, loading: false };
  }),
  on(openCriterionView, (state) => {
    const modal = {
      ...state.modal,
      status: CriterionModalStatus.Init,
      errors: [],
    };
    return {
      ...state,
      modal,
    };
  })
);
