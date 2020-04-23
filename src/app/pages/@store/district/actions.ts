import { createAction, props } from '@ngrx/store';

import { DistrictModel } from './model';
import { DistrictResultsModel, DistrictResultModel } from './results.model';

const getDistricts = createAction(
  '[DISTRICT] Get Districts',
  props<{ payload: any }>()
);

const getDistrictsSuccess = createAction(
  '[DISTRICT] Get Districts Success',
  props<{ payload: DistrictResultsModel }>()
);

export const getDistrictsFailure = createAction('[DISTRICT] Get Districts Faild');

const getDistrict = createAction(
  '[DISTRICT] Get District',
  props<{ payload: any }>()
);

const getDistrictSuccess = createAction(
  '[DISTRICT] Get District Success',
  props<{ payload: DistrictResultModel }>()
);

export const getDistrictFailure = createAction('[DISTRICT] Get District Faild');

const createDistrict = createAction(
  '[DISTRICT] Create District',
  props<{ payload: DistrictModel }>()
);

const createDistrictSuccess = createAction(
  '[DISTRICT] Create District Success',
  props<{ payload: DistrictResultModel }>()
);

export const createDistrictFailure = createAction(
  '[DISTRICT] Create District Faild',
  props<{ payload: DistrictResultModel }>()
);

const updateDistrict = createAction(
  '[DISTRICT] Update District',
  props<{ payload: DistrictModel }>()
);

const updateDistrictSuccess = createAction(
  '[DISTRICT] Update District Success',
  props<{ payload: DistrictResultModel }>()
);

export const updateDistrictFailure = createAction(
  '[DISTRICT] Update District Faild',
  props<{ payload: DistrictResultModel }>()
);

const deleteDistrict = createAction(
  '[DISTRICT] Delete District',
  props<{ payload: number }>()
);

const deleteDistrictSuccess = createAction(
  '[DISTRICT] Delete District Success',
  props<{ payload: DistrictResultModel }>()
);

export const deleteDistrictFailure = createAction(
  '[DISTRICT] Delete District Faild',
  props<{ payload: DistrictResultModel }>()
);
export const openDistrictView = createAction('[DISTRICT] Open District View');

export const DistrictsActions = {
  openDistrictView,
  getDistricts,
  getDistrictsSuccess,
  getDistrictsFailure,
  getDistrict,
  getDistrictSuccess,
  getDistrictFailure,
  createDistrict,
  createDistrictSuccess,
  createDistrictFailure,
  updateDistrict,
  updateDistrictSuccess,
  updateDistrictFailure,
  deleteDistrict,
  deleteDistrictSuccess,
  deleteDistrictFailure,
};
