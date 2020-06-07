import { CollectionsActions } from './actions';
import { CollectionModel } from './model';
import { createReducer, on } from '@ngrx/store';

export enum CollectionModalStatus {
  Init = 0,
  Called = 1,
  Success = 2,
  Failure = 3,
}

export enum CollectionModalType {
  Create = 0,
  Edit = 1,
  View = 2,
}

const {
  getCollections,
  getCollectionsFailure,
  getCollectionsSuccess,
  getCollection,
  getCollectionFailure,
  getCollectionSuccess,
  createCollection,
  createCollectionFailure,
  createCollectionSuccess,
  updateCollection,
  updateCollectionFailure,
  updateCollectionSuccess,
  deleteCollection,
  deleteCollectionFailure,
  deleteCollectionSuccess,

  openCollectionView,
} = CollectionsActions;
export interface CollectionState {
  list: Array<CollectionModel>;
  item: CollectionModel;
  pagination: {
    pageCount?: number;
    page?: number;
    count?: number;
    total?: number;
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
    type: CollectionModalType;
    data: any;
    isLoading: boolean;
    errors: Array<any>;
    status: CollectionModalStatus;
  };
  profile: CollectionModel;
  profileLoading: boolean;
  profilePasswordLoading: boolean;
}

export const initialState: CollectionState = {
  list: [],
  item: null,

  pagination: {
    pageCount: 10,
    page: 0,
    count: 0,
    total: 0,
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
    type: CollectionModalType.View,
    data: null,
    isLoading: false,
    errors: [],
    status: CollectionModalStatus.Init,
  },
  profile: null,
  profileLoading: false,
  profilePasswordLoading: false,
};

export const reducer = createReducer(
  initialState,
  on(getCollections, (state, { payload }) => {
    return { ...state, loading: true, params: { ...payload } };
  }),
  on(getCollectionsSuccess, (state, { payload }) => {
    const pagination = {
      pageCount: payload.count,
      page: payload.page,
      total: payload.total,
      count: payload.count,
    };
    return {
      ...state,
      list: [...payload.data],
      pagination,
      loading: false,
    };
  }),
  on(getCollectionsFailure, (state) => {
    return {
      ...state,
      loading: false,
    };
  }),
  on(updateCollection, (state) => {
    const modal = {
      ...state.modal,
      isLoading: true,
      status: CollectionModalStatus.Called,
      type: CollectionModalType.Edit,
      errors: [],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(updateCollectionSuccess, (state) => {
    const modal = {
      ...state.modal,
      isLoading: false,
      status: CollectionModalStatus.Success,
    };
    return {
      ...state,
      modal,
    };
  }),
  on(updateCollectionFailure, (state, { payload }) => {
    const { validationErrors = [] } = payload;
    const modal = {
      ...state.modal,
      isLoading: false,
      status: CollectionModalStatus.Failure,
      errors: [...validationErrors],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(createCollection, (state, { payload }) => {
    const modal = {
      ...state.modal,
      isLoading: true,
      status: CollectionModalStatus.Init,
      type: CollectionModalType.Create,
      errors: [],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(createCollectionSuccess, (state) => {
    const modal = {
      ...state.modal,
      isLoading: false,
      status: CollectionModalStatus.Success,
    };
    return {
      ...state,
      modal,
    };
  }),
  on(createCollectionFailure, (state, { payload }) => {
    const { validationErrors = [] } = payload;
    const modal = {
      ...state.modal,
      isLoading: false,
      status: CollectionModalStatus.Failure,
      errors: [...validationErrors],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(deleteCollection, (state) => {
    return { ...state, loading: true };
  }),
  on(deleteCollectionSuccess, (state) => {
    return { ...state, loading: false };
  }),
  on(deleteCollectionFailure, (state) => {
    return { ...state, loading: false };
  }),
  on(openCollectionView, (state) => {
    const modal = {
      ...state.modal,
      status: CollectionModalStatus.Init,
      errors: [],
    };
    return {
      ...state,
      modal,
    };
  })
);
