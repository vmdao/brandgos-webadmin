import { TemplatesActions } from './actions';
import { TemplateModel } from './model';
import { createReducer, on } from '@ngrx/store';

export enum TemplateModalStatus {
  Init = 0,
  Called = 1,
  Success = 2,
  Failure = 3,
}

export enum TemplateModalType {
  Create = 0,
  Edit = 1,
  View = 2,
}

const {
  getTemplates,
  getTemplatesFailure,
  getTemplatesSuccess,
  getTemplate,
  getTemplateFailure,
  getTemplateSuccess,
  createTemplate,
  createTemplateFailure,
  createTemplateSuccess,
  updateTemplate,
  updateTemplateFailure,
  updateTemplateSuccess,
  deleteTemplate,
  deleteTemplateFailure,
  deleteTemplateSuccess,
  openTemplateView,
  getTemplateIcons,
  getTemplateIconsSuccess,
  getTemplateIconsFailure,
  getTemplateShapes,
  getTemplateShapesSuccess,
  getTemplateShapesFailure,
  getTemplateElements,
  getTemplateElementsSuccess,
  getTemplateElementsFailure,
  getTemplateIconsSearch,
  getTemplateIconsSearchSuccess,
  getTemplateIconsSearchFailure,
  render,
  renderSuccess,
  renderFailure,
} = TemplatesActions;
export interface TemplateState {
  list: Array<TemplateModel>;
  template: TemplateModel;
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
    type: TemplateModalType;
    data: any;
    isLoading: boolean;
    errors: Array<any>;
    status: TemplateModalStatus;
  };

  elements: Array<TemplateModel>;
  elementsLoading: boolean;
  shapes: Array<TemplateModel>;
  shapesLoading: boolean;
  icons: Array<TemplateModel>;
  iconsLoading: boolean;

  renderData: any;
  renderLoading: boolean;
}

export const initialState: TemplateState = {
  list: [],
  template: null,
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
    type: TemplateModalType.View,
    data: null,
    isLoading: false,
    errors: [],
    status: TemplateModalStatus.Init,
  },

  elements: [],
  elementsLoading: false,
  shapes: [],
  shapesLoading: false,
  icons: [],
  iconsLoading: false,

  renderData: null,
  renderLoading: false,
};

export const reducer = createReducer(
  initialState,
  on(getTemplates, (state, { payload }) => {
    return { ...state, loading: true, params: { ...payload } };
  }),
  on(getTemplatesSuccess, (state, { payload }) => {
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
  on(getTemplatesFailure, (state) => {
    return {
      ...state,
      loading: false,
    };
  }),
  on(updateTemplate, (state) => {
    const modal = {
      ...state.modal,
      isLoading: true,
      status: TemplateModalStatus.Called,
      type: TemplateModalType.Edit,
      errors: [],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(updateTemplateSuccess, (state) => {
    const modal = {
      ...state.modal,
      isLoading: false,
      status: TemplateModalStatus.Success,
    };
    return {
      ...state,
      modal,
    };
  }),
  on(updateTemplateFailure, (state, { payload }) => {
    const { validationErrors = [] } = payload;
    const modal = {
      ...state.modal,
      isLoading: false,
      status: TemplateModalStatus.Failure,
      errors: [...validationErrors],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(createTemplate, (state, { payload }) => {
    const modal = {
      ...state.modal,
      isLoading: true,
      status: TemplateModalStatus.Init,
      type: TemplateModalType.Create,
      errors: [],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(createTemplateSuccess, (state) => {
    const modal = {
      ...state.modal,
      isLoading: false,
      status: TemplateModalStatus.Success,
    };
    return {
      ...state,
      modal,
    };
  }),
  on(createTemplateFailure, (state, { payload }) => {
    const { validationErrors = [] } = payload;
    const modal = {
      ...state.modal,
      isLoading: false,
      status: TemplateModalStatus.Failure,
      errors: [...validationErrors],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(deleteTemplate, (state) => {
    return { ...state, loading: true };
  }),
  on(deleteTemplateSuccess, (state) => {
    return { ...state, loading: false };
  }),
  on(deleteTemplateFailure, (state) => {
    return { ...state, loading: false };
  }),
  on(openTemplateView, (state) => {
    const modal = {
      ...state.modal,
      status: TemplateModalStatus.Init,
      errors: [],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(getTemplateIcons, (state) => {
    return { ...state, iconsLoading: true };
  }),
  on(getTemplateIconsSuccess, (state, { payload }) => {
    return {
      ...state,
      icons: [...payload.data],
      iconsLoading: false,
    };
  }),
  on(getTemplateIconsFailure, (state) => {
    return {
      ...state,
      iconsLoading: false,
    };
  }),
  on(getTemplateIconsSearch, (state) => {
    return { ...state, iconsLoading: true };
  }),
  on(getTemplateIconsSearchSuccess, (state, { payload }) => {
    return {
      ...state,
      icons: [...payload.data],
      iconsLoading: false,
    };
  }),
  on(getTemplateIconsSearchFailure, (state) => {
    return {
      ...state,
      iconsLoading: false,
    };
  }),
  on(getTemplateShapes, (state) => {
    return { ...state, shapesLoading: true };
  }),
  on(getTemplateShapesSuccess, (state, { payload }) => {
    return {
      ...state,
      shapes: [...payload.data],
      shapesLoading: false,
    };
  }),
  on(getTemplateShapesFailure, (state) => {
    return {
      ...state,
      shapesLoading: false,
    };
  }),
  on(getTemplateElements, (state) => {
    return { ...state, elementsLoading: true };
  }),
  on(getTemplateElementsSuccess, (state, { payload }) => {
    return {
      ...state,
      elements: [...payload.data],
      elementsLoading: false,
    };
  }),
  on(getTemplateElementsFailure, (state) => {
    return {
      ...state,
      elementsLoading: false,
    };
  }),

  on(render, (state) => {
    return { ...state, renderLoading: true };
  }),
  on(renderSuccess, (state, { payload }) => {
    return {
      ...state,
      renderData: payload,
      renderLoading: false,
    };
  }),
  on(renderFailure, (state) => {
    return {
      ...state,
      renderLoading: false,
    };
  })
);
