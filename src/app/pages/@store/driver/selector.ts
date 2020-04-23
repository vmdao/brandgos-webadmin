import { createSelector } from '@ngrx/store';
import * as fromApp from '../reducers';
import * as fromDriver from './';

export const getDriverState = createSelector(
  fromApp.selectContainerState,
  (state: fromApp.AppState) => state.drivers
);

export const getDrivers = createSelector(
  getDriverState,
  (state: fromDriver.DriverState) => state.list
);

export const getDriver = createSelector(
  getDriverState,
  (state: fromDriver.DriverState) => state.item
);

export const getDriversPagination = createSelector(
  getDriverState,
  (state: fromDriver.DriverState) => state.pagination
);

export const getDriversParams = createSelector(
  getDriverState,
  (state: fromDriver.DriverState) => state.params
);

export const getDriversLoading = createSelector(
  getDriverState,
  (state: fromDriver.DriverState) => state.loading
);

export const getDriverView = createSelector(
  getDriverState,
  (state: fromDriver.DriverState) => state.modal
);
