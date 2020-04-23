import { createAction, props } from '@ngrx/store';

import { CriterionModel } from './model';
import { CriterionResultsModel, CriterionResultModel } from './results.model';

const getCriterions = createAction(
  '[CRITERION] Get Criterions',
  props<{ payload: any }>()
);

const getCriterionsSuccess = createAction(
  '[CRITERION] Get Criterions Success',
  props<{ payload: CriterionResultsModel }>()
);

export const getCriterionsFailure = createAction(
  '[CRITERION] Get Criterions Faild'
);

const getCriterion = createAction(
  '[CRITERION] Get Criterion',
  props<{ payload: any }>()
);

const getCriterionSuccess = createAction(
  '[CRITERION] Get Criterion Success',
  props<{ payload: CriterionResultModel }>()
);

export const getCriterionFailure = createAction(
  '[CRITERION] Get Criterion Faild'
);

const createCriterion = createAction(
  '[CRITERION] Create Criterion',
  props<{ payload: CriterionModel }>()
);

const createCriterionSuccess = createAction(
  '[CRITERION] Create Criterion Success',
  props<{ payload: CriterionResultModel }>()
);

export const createCriterionFailure = createAction(
  '[CRITERION] Create Criterion Faild',
  props<{ payload: CriterionResultModel }>()
);

const updateCriterion = createAction(
  '[CRITERION] Update Criterion',
  props<{ payload: CriterionModel }>()
);

const updateCriterionSuccess = createAction(
  '[CRITERION] Update Criterion Success',
  props<{ payload: CriterionResultModel }>()
);

export const updateCriterionFailure = createAction(
  '[CRITERION] Update Criterion Faild',
  props<{ payload: CriterionResultModel }>()
);

const deleteCriterion = createAction(
  '[CRITERION] Delete Criterion',
  props<{ payload: number }>()
);

const deleteCriterionSuccess = createAction(
  '[CRITERION] Delete Criterion Success',
  props<{ payload: CriterionResultModel }>()
);

export const deleteCriterionFailure = createAction(
  '[CRITERION] Delete Criterion Faild',
  props<{ payload: CriterionResultModel }>()
);

export const openCriterionView = createAction(
  '[CRITERION] Open Criterion View'
);

export const CriterionsActions = {
  openCriterionView,
  getCriterions,
  getCriterionsSuccess,
  getCriterionsFailure,
  getCriterion,
  getCriterionSuccess,
  getCriterionFailure,
  createCriterion,
  createCriterionSuccess,
  createCriterionFailure,
  updateCriterion,
  updateCriterionSuccess,
  updateCriterionFailure,
  deleteCriterion,
  deleteCriterionSuccess,
  deleteCriterionFailure,
};
