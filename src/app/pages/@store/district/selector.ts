import { createSelector } from '@ngrx/store';
import * as fromApp from '../reducers';
import * as fromDistrict from './';

export const getDistrictState = createSelector(
  fromApp.selectContainerState,
  (state: fromApp.AppState) => state.districts
);

export const getDistricts = createSelector(
  getDistrictState,
  (state: fromDistrict.DistrictState) => state.list
);

export const getDistrict = createSelector(
  getDistrictState,
  (state: fromDistrict.DistrictState) => state.item
);

export const getDistrictsPagination = createSelector(
  getDistrictState,
  (state: fromDistrict.DistrictState) => state.pagination
);

export const getDistrictsParams = createSelector(
  getDistrictState,
  (state: fromDistrict.DistrictState) => state.params
);

export const getDistrictsLoading = createSelector(
  getDistrictState,
  (state: fromDistrict.DistrictState) => state.loading
);

export const getDistrictView = createSelector(
  getDistrictState,
  (state: fromDistrict.DistrictState) => state.modal
);
