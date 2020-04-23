import { ProductsActions } from './actions';
import { ProductModel } from './model';
import { createReducer, on } from '@ngrx/store';

export enum ProductModalStatus {
  Init = 0,
  Called = 1,
  Success = 2,
  Failure = 3,
}

export enum ProductModalType {
  Create = 0,
  Edit = 1,
  View = 2,
}

const {
  getProducts,
  getProductsFailure,
  getProductsSuccess,
  getProduct,
  getProductFailure,
  getProductSuccess,
  createProduct,
  createProductFailure,
  createProductSuccess,
  updateProduct,
  updateProductFailure,
  updateProductSuccess,
  deleteProduct,
  deleteProductFailure,
  deleteProductSuccess,
  openProductView,
} = ProductsActions;
export interface ProductState {
  list: Array<ProductModel>;
  item: ProductModel;
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
    type: ProductModalType;
    data: any;
    isLoading: boolean;
    errors: Array<any>;
    status: ProductModalStatus;
  };
}

export const initialState: ProductState = {
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
    type: ProductModalType.View,
    data: null,
    isLoading: false,
    errors: [],
    status: ProductModalStatus.Init,
  },
};

export const reducer = createReducer(
  initialState,
  on(getProducts, (state, { payload }) => {
    return { ...state, loading: true, params: { ...payload } };
  }),
  on(getProductsSuccess, (state, { payload }) => {
    return {
      ...state,
      list: [...payload.data],
      pagination: { ...payload.pagination },
      loading: false,
    };
  }),
  on(getProductsFailure, (state) => {
    return {
      ...state,
      loading: false,
    };
  }),
  on(updateProduct, (state) => {
    const modal = {
      ...state.modal,
      isLoading: true,
      status: ProductModalStatus.Called,
      type: ProductModalType.Edit,
      errors: [],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(updateProductSuccess, (state) => {
    const modal = {
      ...state.modal,
      isLoading: false,
      status: ProductModalStatus.Success,
    };
    return {
      ...state,
      modal,
    };
  }),
  on(updateProductFailure, (state, { payload }) => {
    const { validationErrors = [] } = payload;
    const modal = {
      ...state.modal,
      isLoading: false,
      status: ProductModalStatus.Failure,
      errors: [...validationErrors],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(createProduct, (state, { payload }) => {
    const modal = {
      ...state.modal,
      isLoading: true,
      status: ProductModalStatus.Init,
      type: ProductModalType.Create,
      errors: [],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(createProductSuccess, (state) => {
    const modal = {
      ...state.modal,
      isLoading: false,
      status: ProductModalStatus.Success,
    };
    return {
      ...state,
      modal,
    };
  }),
  on(createProductFailure, (state, { payload }) => {
    const { validationErrors = [] } = payload;
    const modal = {
      ...state.modal,
      isLoading: false,
      status: ProductModalStatus.Failure,
      errors: [...validationErrors],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(deleteProduct, (state) => {
    return { ...state, loading: true };
  }),
  on(deleteProductSuccess, (state) => {
    return { ...state, loading: false };
  }),
  on(deleteProductFailure, (state) => {
    return { ...state, loading: false };
  }),
  on(openProductView, (state) => {
    const modal = {
      ...state.modal,
      status: ProductModalStatus.Init,
      errors: [],
    };
    return {
      ...state,
      modal,
    };
  })
);
