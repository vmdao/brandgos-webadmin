import { createAction, props } from '@ngrx/store';

import { CriteriaBundleModel } from './model';
import {
  CriteriaBundleResultsModel,
  CriteriaBundleResultModel,
} from './results.model';
import { CriterionResultsModel, CriterionModel } from '../criterion';

const getCriteriaBundles = createAction(
  '[CRITERIABUNDLE] Get CriteriaBundles',
  props<{ payload: any }>()
);

const getCriteriaBundlesSuccess = createAction(
  '[CRITERIABUNDLE] Get CriteriaBundles Success',
  props<{ payload: CriteriaBundleResultsModel }>()
);

export const getCriteriaBundlesFailure = createAction(
  '[CRITERIABUNDLE] Get CriteriaBundles Faild'
);

const getCriteriaBundle = createAction(
  '[CRITERIABUNDLE] Get CriteriaBundle',
  props<{ payload: any }>()
);

const getCriteriaBundleSuccess = createAction(
  '[CRITERIABUNDLE] Get CriteriaBundle Success',
  props<{ payload: CriteriaBundleResultModel }>()
);

export const getCriteriaBundleFailure = createAction(
  '[CRITERIABUNDLE] Get CriteriaBundle Faild'
);

const createCriteriaBundle = createAction(
  '[CRITERIABUNDLE] Create CriteriaBundle',
  props<{ payload: CriteriaBundleModel }>()
);

const createCriteriaBundleSuccess = createAction(
  '[CRITERIABUNDLE] Create CriteriaBundle Success',
  props<{ payload: CriteriaBundleResultModel }>()
);

export const createCriteriaBundleFailure = createAction(
  '[CRITERIABUNDLE] Create CriteriaBundle Faild',
  props<{ payload: CriteriaBundleResultModel }>()
);

const updateCriteriaBundle = createAction(
  '[CRITERIABUNDLE] Update CriteriaBundle',
  props<{ payload: CriteriaBundleModel }>()
);

const updateCriteriaBundleSuccess = createAction(
  '[CRITERIABUNDLE] Update CriteriaBundle Success',
  props<{ payload: CriteriaBundleResultModel }>()
);

export const updateCriteriaBundleFailure = createAction(
  '[CRITERIABUNDLE] Update CriteriaBundle Faild',
  props<{ payload: CriteriaBundleResultModel }>()
);

const deleteCriteriaBundle = createAction(
  '[CRITERIABUNDLE] Delete CriteriaBundle',
  props<{ payload: number }>()
);

const deleteCriteriaBundleSuccess = createAction(
  '[CRITERIABUNDLE] Delete CriteriaBundle Success',
  props<{ payload: CriteriaBundleResultModel }>()
);

export const deleteCriteriaBundleFailure = createAction(
  '[CRITERIABUNDLE] Delete CriteriaBundle Faild',
  props<{ payload: CriteriaBundleResultModel }>()
);

export const openCriteriaBundleView = createAction(
  '[CRITERIABUNDLE] Open CriteriaBundle View'
);

const getCriteriaBundleCriterions = createAction(
  '[CRITERIABUNDLE] Get CriteriaBundle Criterion',
  props<{ payload: { criteriaBundleId: number } }>()
);

const getCriteriaBundleCriterionsSuccess = createAction(
  '[CRITERIABUNDLE] Get CriteriaBundle Criterion Success',
  props<{ payload: CriterionResultsModel }>()
);

export const getCriteriaBundleCriterionsFailure = createAction(
  '[CRITERIABUNDLE] Get CriteriaBundle Criterion Faild'
);

const addCriterion = createAction('[CRITERIABUNDLE] Add Criterion');

const editCriterion = createAction(
  '[CRITERIABUNDLE] Edit Criterion',
  props<{ payload: CriterionModel }>()
);

const removeCriterion = createAction(
  '[CRITERIABUNDLE] Remove Criterion',
  props<{ payload: CriterionModel }>()
);

const cleanCriterions = createAction('[CRITERIABUNDLE] Clean Criterions');

export const CriteriaBundlesActions = {
  cleanCriterions,
  addCriterion,
  editCriterion,
  removeCriterion,
  getCriteriaBundleCriterions,
  getCriteriaBundleCriterionsSuccess,
  getCriteriaBundleCriterionsFailure,
  openCriteriaBundleView,
  getCriteriaBundles,
  getCriteriaBundlesSuccess,
  getCriteriaBundlesFailure,
  getCriteriaBundle,
  getCriteriaBundleSuccess,
  getCriteriaBundleFailure,
  createCriteriaBundle,
  createCriteriaBundleSuccess,
  createCriteriaBundleFailure,
  updateCriteriaBundle,
  updateCriteriaBundleSuccess,
  updateCriteriaBundleFailure,
  deleteCriteriaBundle,
  deleteCriteriaBundleSuccess,
  deleteCriteriaBundleFailure,
};
