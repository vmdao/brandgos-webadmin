import { createSelector } from '@ngrx/store';
import * as fromApp from '../reducers';
import * as fromProvince from './';

export const getProvinceState = createSelector(
  fromApp.selectContainerState,
  (state: fromApp.AppState) => state.provinces
);

export const getProvinces = createSelector(
  getProvinceState,
  (state: fromProvince.ProvinceState) => state.list
);

export const getProvince = createSelector(
  getProvinceState,
  (state: fromProvince.ProvinceState) => state.item
);

export const getProvincesPagination = createSelector(
  getProvinceState,
  (state: fromProvince.ProvinceState) => state.pagination
);

export const getProvincesParams = createSelector(
  getProvinceState,
  (state: fromProvince.ProvinceState) => state.params
);

export const getProvincesLoading = createSelector(
  getProvinceState,
  (state: fromProvince.ProvinceState) => state.loading
);

export const getProvinceView = createSelector(
  getProvinceState,
  (state: fromProvince.ProvinceState) => state.modal
);

export const getProvinceDistricts = createSelector(
  getProvinceState,
  (state: fromProvince.ProvinceState) => state.districts
);

export const getProvinceDistrictsLoading = createSelector(
  getProvinceState,
  (state: fromProvince.ProvinceState) => state.districtsLoading
);
