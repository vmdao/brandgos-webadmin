import { ItemsActions } from './actions';
import { ItemModel } from './model';
import { createReducer, on } from '@ngrx/store';

export enum ItemModalStatus {
  Init = 0,
  Called = 1,
  Success = 2,
  Failure = 3,
}

export enum ItemModalType {
  Create = 0,
  Edit = 1,
  View = 2,
}

const {
  getItems,
  getItemsFailure,
  getItemsSuccess,
  getItem,
  getItemFailure,
  getItemSuccess,
  createItem,
  createItemFailure,
  createItemSuccess,
  updateItem,
  updateItemFailure,
  updateItemSuccess,
  deleteItem,
  deleteItemFailure,
  deleteItemSuccess,
  openItemView,
  getItemIcons,
  getItemIconsSuccess,
  getItemIconsFailure,
  getItemShapes,
  getItemShapesSuccess,
  getItemShapesFailure,
  getItemElements,
  getItemElementsSuccess,
  getItemElementsFailure,
} = ItemsActions;
export interface ItemState {
  list: Array<ItemModel>;
  item: ItemModel;
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
    type: ItemModalType;
    data: any;
    isLoading: boolean;
    errors: Array<any>;
    status: ItemModalStatus;
  };

  elements: Array<ItemModel>;
  elementsLoading: boolean;
  shapes: Array<ItemModel>;
  shapesLoading: boolean;
  icons: Array<ItemModel>;
  iconsLoading: boolean;
}

export const initialState: ItemState = {
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
    type: ItemModalType.View,
    data: null,
    isLoading: false,
    errors: [],
    status: ItemModalStatus.Init,
  },

  elements: [],
  elementsLoading: false,
  shapes: [],
  shapesLoading: false,
  icons: [],
  iconsLoading: false,
};

export const reducer = createReducer(
  initialState,
  on(getItems, (state, { payload }) => {
    return { ...state, loading: true, params: { ...payload } };
  }),
  on(getItemsSuccess, (state, { payload }) => {
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
  on(getItemsFailure, (state) => {
    return {
      ...state,
      loading: false,
    };
  }),
  on(updateItem, (state) => {
    const modal = {
      ...state.modal,
      isLoading: true,
      status: ItemModalStatus.Called,
      type: ItemModalType.Edit,
      errors: [],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(updateItemSuccess, (state) => {
    const modal = {
      ...state.modal,
      isLoading: false,
      status: ItemModalStatus.Success,
    };
    return {
      ...state,
      modal,
    };
  }),
  on(updateItemFailure, (state, { payload }) => {
    const { validationErrors = [] } = payload;
    const modal = {
      ...state.modal,
      isLoading: false,
      status: ItemModalStatus.Failure,
      errors: [...validationErrors],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(createItem, (state, { payload }) => {
    const modal = {
      ...state.modal,
      isLoading: true,
      status: ItemModalStatus.Init,
      type: ItemModalType.Create,
      errors: [],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(createItemSuccess, (state) => {
    const modal = {
      ...state.modal,
      isLoading: false,
      status: ItemModalStatus.Success,
    };
    return {
      ...state,
      modal,
    };
  }),
  on(createItemFailure, (state, { payload }) => {
    const { validationErrors = [] } = payload;
    const modal = {
      ...state.modal,
      isLoading: false,
      status: ItemModalStatus.Failure,
      errors: [...validationErrors],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(deleteItem, (state) => {
    return { ...state, loading: true };
  }),
  on(deleteItemSuccess, (state) => {
    return { ...state, loading: false };
  }),
  on(deleteItemFailure, (state) => {
    return { ...state, loading: false };
  }),
  on(openItemView, (state) => {
    const modal = {
      ...state.modal,
      status: ItemModalStatus.Init,
      errors: [],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(getItemIcons, (state) => {
    return { ...state, iconsLoading: true };
  }),
  on(getItemIconsSuccess, (state, { payload }) => {
    return {
      ...state,
      icons: [...payload.data],
      iconsLoading: false,
    };
  }),
  on(getItemIconsFailure, (state) => {
    return {
      ...state,
      iconsLoading: false,
    };
  }),
  on(getItemShapes, (state) => {
    return { ...state, shapesLoading: true };
  }),
  on(getItemShapesSuccess, (state, { payload }) => {
    return {
      ...state,
      shapes: [...payload.data],
      shapesLoading: false,
    };
  }),
  on(getItemShapesFailure, (state) => {
    return {
      ...state,
      shapesLoading: false,
    };
  }),
  on(getItemElements, (state) => {
    return { ...state, elementsLoading: true };
  }),
  on(getItemElementsSuccess, (state, { payload }) => {
    return {
      ...state,
      elements: [...payload.data],
      elementsLoading: false,
    };
  }),
  on(getItemElementsFailure, (state) => {
    return {
      ...state,
      elementsLoading: false,
    };
  })
);
