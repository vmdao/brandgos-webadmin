import { WorkersActions } from './actions';
import { WorkerModel } from './model';
import { createReducer, on } from '@ngrx/store';

export enum WorkerModalStatus {
  Init = 0,
  Called = 1,
  Success = 2,
  Failure = 3,
}

export enum WorkerModalType {
  Create = 0,
  Edit = 1,
  View = 2,
}

const {
  getWorkers,
  getWorkersFailure,
  getWorkersSuccess,
  getWorker,
  getWorkerFailure,
  getWorkerSuccess,
  createWorker,
  createWorkerFailure,
  createWorkerSuccess,
  updateWorker,
  updateWorkerFailure,
  updateWorkerSuccess,
  deleteWorker,
  deleteWorkerFailure,
  deleteWorkerSuccess,
  openWorkerView,
  getLeadersIdle,
  getLeadersIdleFailure,
  getLeadersIdleSuccess,

  getWorkersIdle,
  getWorkersIdleFailure,
  getWorkersIdleSuccess,
} = WorkersActions;
export interface WorkerState {
  list: Array<WorkerModel>;
  item: WorkerModel;
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
    type: WorkerModalType;
    data: any;
    isLoading: boolean;
    errors: Array<any>;
    status: WorkerModalStatus;
  };

  leadersIdle: Array<WorkerModel>;
  leadersIdleLoading: boolean;

  workersIdle: Array<WorkerModel>;
  workersIdleLoading: boolean;
  workersIdlePagination: {
    page: number;
    size: number;
    totalRecords: number;
  };
}

export const initialState: WorkerState = {
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
    type: WorkerModalType.View,
    data: null,
    isLoading: false,
    errors: [],
    status: WorkerModalStatus.Init,
  },
  leadersIdle: [],
  leadersIdleLoading: false,

  workersIdle: [],
  workersIdleLoading: false,
  workersIdlePagination: {
    page: 0,
    size: 10,
    totalRecords: 0,
  },
};

export const reducer = createReducer(
  initialState,
  on(getWorkers, (state, { payload }) => {
    return { ...state, loading: true, params: { ...payload } };
  }),
  on(getWorkersSuccess, (state, { payload }) => {
    return {
      ...state,
      list: [...payload.data],
      pagination: { ...payload.pagination },
      loading: false,
    };
  }),
  on(getWorkersFailure, (state) => {
    return {
      ...state,
      loading: false,
    };
  }),
  on(updateWorker, (state) => {
    const modal = {
      ...state.modal,
      isLoading: true,
      status: WorkerModalStatus.Called,
      type: WorkerModalType.Edit,
      errors: [],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(updateWorkerSuccess, (state) => {
    const modal = {
      ...state.modal,
      isLoading: false,
      status: WorkerModalStatus.Success,
    };
    return {
      ...state,
      modal,
    };
  }),
  on(updateWorkerFailure, (state, { payload }) => {
    const { validationErrors = [] } = payload;
    const modal = {
      ...state.modal,
      isLoading: false,
      status: WorkerModalStatus.Failure,
      errors: [...validationErrors],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(createWorker, (state, { payload }) => {
    const modal = {
      ...state.modal,
      isLoading: true,
      status: WorkerModalStatus.Init,
      type: WorkerModalType.Create,
      errors: [],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(createWorkerSuccess, (state) => {
    const modal = {
      ...state.modal,
      isLoading: false,
      status: WorkerModalStatus.Success,
    };
    return {
      ...state,
      modal,
    };
  }),
  on(createWorkerFailure, (state, { payload }) => {
    const { validationErrors = [] } = payload;
    const modal = {
      ...state.modal,
      isLoading: false,
      status: WorkerModalStatus.Failure,
      errors: [...validationErrors],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(deleteWorker, (state) => {
    return { ...state, loading: true };
  }),
  on(deleteWorkerSuccess, (state) => {
    return { ...state, loading: false };
  }),
  on(deleteWorkerFailure, (state) => {
    return { ...state, loading: false };
  }),
  on(openWorkerView, (state) => {
    const modal = {
      ...state.modal,
      status: WorkerModalStatus.Init,
      errors: [],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(getLeadersIdle, (state) => {
    return { ...state, leadersIdleLoading: true };
  }),
  on(getLeadersIdleSuccess, (state, { payload }) => {
    return {
      ...state,
      leadersIdle: [...payload.data],
      leadersIdleLoading: false,
    };
  }),
  on(getLeadersIdleFailure, (state) => {
    return {
      ...state,
      leadersIdleLoading: false,
    };
  }),
  on(getWorkersIdle, (state) => {
    return { ...state, workersIdleLoading: true };
  }),
  on(getWorkersIdleSuccess, (state, { payload }) => {
    return {
      ...state,
      workersIdle: [...payload.data],
      workersIdlePagination: { ...payload.pagination },
      workersIdleLoading: false,
    };
  }),
  on(getWorkersIdleFailure, (state) => {
    return {
      ...state,
      workersIdleLoading: false,
    };
  })
);
