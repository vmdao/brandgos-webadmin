import { createAction, props } from '@ngrx/store';

import { ProvinceModel } from './model';
import { ProvinceResultsModel, ProvinceResultModel } from './results.model';
import { DistrictResultsModel } from '../district';

const getProvinces = createAction(
  '[PROVINCE] Get Provinces',
  props<{ payload: any }>()
);

const getProvincesSuccess = createAction(
  '[PROVINCE] Get Provinces Success',
  props<{ payload: ProvinceResultsModel }>()
);

export const getProvincesFailure = createAction(
  '[PROVINCE] Get Provinces Faild'
);

const getProvince = createAction(
  '[PROVINCE] Get Province',
  props<{ payload: any }>()
);

const getProvinceSuccess = createAction(
  '[PROVINCE] Get Province Success',
  props<{ payload: ProvinceResultModel }>()
);

export const getProvinceFailure = createAction('[PROVINCE] Get Province Faild');

const createProvince = createAction(
  '[PROVINCE] Create Province',
  props<{ payload: ProvinceModel }>()
);

const createProvinceSuccess = createAction(
  '[PROVINCE] Create Province Success',
  props<{ payload: ProvinceResultModel }>()
);

export const createProvinceFailure = createAction(
  '[PROVINCE] Create Province Faild',
  props<{ payload: ProvinceResultModel }>()
);

const updateProvince = createAction(
  '[PROVINCE] Update Province',
  props<{ payload: ProvinceModel }>()
);

const updateProvinceSuccess = createAction(
  '[PROVINCE] Update Province Success',
  props<{ payload: ProvinceResultModel }>()
);

export const updateProvinceFailure = createAction(
  '[PROVINCE] Update Province Faild',
  props<{ payload: ProvinceResultModel }>()
);

const deleteProvince = createAction(
  '[PROVINCE] Delete Province',
  props<{ payload: number }>()
);

const deleteProvinceSuccess = createAction(
  '[PROVINCE] Delete Province Success',
  props<{ payload: ProvinceResultModel }>()
);

export const deleteProvinceFailure = createAction(
  '[PROVINCE] Delete Province Faild',
  props<{ payload: ProvinceResultModel }>()
);
export const openProvinceView = createAction('[PROVINCE] Open Province View');

const getProvinceDistricts = createAction(
  '[PROVINCE] Get Province Districts',
  props<{ id: number; options: any }>()
);

const getProvinceDistrictsSuccess = createAction(
  '[PROVINCE] Get Province Districts Success',
  props<{ payload: DistrictResultsModel }>()
);

export const getProvinceDistrictsFailure = createAction(
  '[PROVINCE] Get Province Districts Faild'
);

export const ProvincesActions = {
  getProvinceDistricts,
  getProvinceDistrictsSuccess,
  getProvinceDistrictsFailure,
  openProvinceView,
  getProvinces,
  getProvincesSuccess,
  getProvincesFailure,
  getProvince,
  getProvinceSuccess,
  getProvinceFailure,
  createProvince,
  createProvinceSuccess,
  createProvinceFailure,
  updateProvince,
  updateProvinceSuccess,
  updateProvinceFailure,
  deleteProvince,
  deleteProvinceSuccess,
  deleteProvinceFailure,
};
