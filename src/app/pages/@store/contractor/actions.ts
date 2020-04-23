import { createAction, props } from '@ngrx/store';

import { ContractorModel } from './model';
import { ContractorResultsModel, ContractorResultModel } from './results.model';

const getContractors = createAction(
  '[WORKER] Get Contractors',
  props<{ payload: any }>()
);

const getContractorsSuccess = createAction(
  '[WORKER] Get Contractors Success',
  props<{ payload: ContractorResultsModel }>()
);

export const getContractorsFailure = createAction('[WORKER] Get Contractors Faild');

const getContractor = createAction(
  '[WORKER] Get Contractor',
  props<{ payload: any }>()
);

const getContractorSuccess = createAction(
  '[WORKER] Get Contractor Success',
  props<{ payload: ContractorResultModel }>()
);

export const getContractorFailure = createAction('[WORKER] Get Contractor Faild');

const createContractor = createAction(
  '[WORKER] Create Contractor',
  props<{ payload: ContractorModel }>()
);

const createContractorSuccess = createAction(
  '[WORKER] Create Contractor Success',
  props<{ payload: ContractorResultModel }>()
);

export const createContractorFailure = createAction(
  '[WORKER] Create Contractor Faild',
  props<{ payload: ContractorResultModel }>()
);

const updateContractor = createAction(
  '[WORKER] Update Contractor',
  props<{ payload: ContractorModel }>()
);

const updateContractorSuccess = createAction(
  '[WORKER] Update Contractor Success',
  props<{ payload: ContractorResultModel }>()
);

export const updateContractorFailure = createAction(
  '[WORKER] Update Contractor Faild',
  props<{ payload: ContractorResultModel }>()
);

const deleteContractor = createAction(
  '[WORKER] Delete Contractor',
  props<{ payload: number }>()
);

const deleteContractorSuccess = createAction(
  '[WORKER] Delete Contractor Success',
  props<{ payload: ContractorResultModel }>()
);

export const deleteContractorFailure = createAction(
  '[WORKER] Delete Contractor Faild',
  props<{ payload: ContractorResultModel }>()
);

export const openContractorView = createAction('[WORKER] Open Contractor View');

export const ContractorsActions = {
  openContractorView,
  getContractors,
  getContractorsSuccess,
  getContractorsFailure,
  getContractor,
  getContractorSuccess,
  getContractorFailure,
  createContractor,
  createContractorSuccess,
  createContractorFailure,
  updateContractor,
  updateContractorSuccess,
  updateContractorFailure,
  deleteContractor,
  deleteContractorSuccess,
  deleteContractorFailure,
};
