import { CriteriaBundlesActions } from './actions';
import { CriteriaBundleModel } from './model';
import { createReducer, on } from '@ngrx/store';
import { CriterionModel } from '../criterion';

export enum CriteriaBundleModalStatus {
  Init = 0,
  Called = 1,
  Success = 2,
  Failure = 3,
}

export enum CriteriaBundleModalType {
  Create = 0,
  Edit = 1,
  View = 2,
}

const {
  getCriteriaBundles,
  getCriteriaBundlesFailure,
  getCriteriaBundlesSuccess,
  getCriteriaBundle,
  getCriteriaBundleFailure,
  getCriteriaBundleSuccess,
  createCriteriaBundle,
  createCriteriaBundleFailure,
  createCriteriaBundleSuccess,
  updateCriteriaBundle,
  updateCriteriaBundleFailure,
  updateCriteriaBundleSuccess,
  deleteCriteriaBundle,
  deleteCriteriaBundleFailure,
  deleteCriteriaBundleSuccess,
  openCriteriaBundleView,
  getCriteriaBundleCriterions,
  getCriteriaBundleCriterionsSuccess,
  getCriteriaBundleCriterionsFailure,
  addCriterion,
  editCriterion,
  removeCriterion,
  cleanCriterions,
} = CriteriaBundlesActions;
export interface CriteriaBundleState {
  list: Array<CriteriaBundleModel>;
  item: CriteriaBundleModel;
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
    type: CriteriaBundleModalType;
    data: any;
    isLoading: boolean;
    errors: Array<any>;
    status: CriteriaBundleModalStatus;
  };
  criterionsLoading: boolean;
  criterions: Array<CriterionModel>;
}

export const initialState: CriteriaBundleState = {
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
    type: CriteriaBundleModalType.View,
    data: null,
    isLoading: false,
    errors: [],
    status: CriteriaBundleModalStatus.Init,
  },
  criterionsLoading: false,
  criterions: [],
};

export const reducer = createReducer(
  initialState,
  on(getCriteriaBundles, (state, { payload }) => {
    return { ...state, loading: true, params: { ...payload } };
  }),
  on(getCriteriaBundlesSuccess, (state, { payload }) => {
    return {
      ...state,
      list: [...payload.data],
      pagination: { ...payload.pagination },
      loading: false,
    };
  }),
  on(getCriteriaBundlesFailure, (state) => {
    return {
      ...state,
      loading: false,
    };
  }),
  on(updateCriteriaBundle, (state) => {
    const modal = {
      ...state.modal,
      isLoading: true,
      status: CriteriaBundleModalStatus.Called,
      type: CriteriaBundleModalType.Edit,
      errors: [],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(updateCriteriaBundleSuccess, (state) => {
    const modal = {
      ...state.modal,
      isLoading: false,
      status: CriteriaBundleModalStatus.Success,
    };
    return {
      ...state,
      modal,
    };
  }),
  on(updateCriteriaBundleFailure, (state, { payload }) => {
    const { validationErrors = [] } = payload;
    const modal = {
      ...state.modal,
      isLoading: false,
      status: CriteriaBundleModalStatus.Failure,
      errors: [...validationErrors],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(createCriteriaBundle, (state, { payload }) => {
    const modal = {
      ...state.modal,
      isLoading: true,
      status: CriteriaBundleModalStatus.Init,
      type: CriteriaBundleModalType.Create,
      errors: [],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(createCriteriaBundleSuccess, (state) => {
    const modal = {
      ...state.modal,
      isLoading: false,
      status: CriteriaBundleModalStatus.Success,
    };
    return {
      ...state,
      modal,
    };
  }),
  on(createCriteriaBundleFailure, (state, { payload }) => {
    const { validationErrors = [] } = payload;
    const modal = {
      ...state.modal,
      isLoading: false,
      status: CriteriaBundleModalStatus.Failure,
      errors: [...validationErrors],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(deleteCriteriaBundle, (state) => {
    return { ...state, loading: true };
  }),
  on(deleteCriteriaBundleSuccess, (state) => {
    return { ...state, loading: false };
  }),
  on(deleteCriteriaBundleFailure, (state) => {
    return { ...state, loading: false };
  }),
  on(openCriteriaBundleView, (state) => {
    const modal = {
      ...state.modal,
      status: CriteriaBundleModalStatus.Init,
      errors: [],
    };
    return {
      ...state,
      modal,
    };
  }),
  on(getCriteriaBundleCriterions, (state) => {
    return { ...state, criterionsLoading: true };
  }),
  on(getCriteriaBundleCriterionsSuccess, (state, { payload }) => {
    const criterions = payload.data.map((c) => {
      return { ...c, uid: `server-${c.id}` };
    });
    return {
      ...state,
      criterions,
      criterionsLoading: false,
    };
  }),
  on(getCriteriaBundleCriterionsFailure, (state) => {
    return {
      ...state,
      criterionsLoading: false,
    };
  }),
  on(addCriterion, (state) => {
    const length = state.criterions.length + 1;
    const criterion = {
      uid: `local-${length}`,
      name: `Tên tiêu chí con ${length}`,
      factor: 1,
      position: 1,
      isNew: true,
    } as CriterionModel;

    return {
      ...state,
      criterions: [...state.criterions, criterion],
    };
  }),
  on(editCriterion, (state, { payload }) => {
    if (!payload) {
      return {
        ...state,
      };
    }
    const newCriterions = state.criterions.map((c) => {
      if (c.uid === payload.uid && !c.isNew) {
        return { ...c, ...payload, isEdited: true };
      }
      if (c.uid === payload.uid && c.isNew) {
        return { ...c, ...payload };
      }
      return c;
    });
    return {
      ...state,
      criterions: newCriterions,
    };
  }),
  on(removeCriterion, (state, { payload }) => {
    if (!payload) {
      return {
        ...state,
      };
    }
    const newCriterions = state.criterions
      .map((c) => {
        if (c.uid === payload.uid && !c.isNew) {
          return { ...c, isRemoved: true };
        }
        return c;
      })
      .filter((c) => {
        if (c.uid === payload.uid && c.isNew) {
          return false;
        }
        return true;
      });
    return {
      ...state,
      criterions: newCriterions,
    };
  }),
  on(cleanCriterions, (state) => {
    return {
      ...state,
      criterions: [],
    };
  })
);
