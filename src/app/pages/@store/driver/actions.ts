import { createAction, props } from '@ngrx/store';

import { DriverModel } from './model';
import { DriverResultsModel, DriverResultModel } from './results.model';

const getDrivers = createAction(
  '[DRIVER] Get Drivers',
  props<{ payload: any }>()
);

const getDriversSuccess = createAction(
  '[DRIVER] Get Drivers Success',
  props<{ payload: DriverResultsModel }>()
);

export const getDriversFailure = createAction('[DRIVER] Get Drivers Faild');

const getDriver = createAction(
  '[DRIVER] Get Driver',
  props<{ payload: any }>()
);

const getDriverSuccess = createAction(
  '[DRIVER] Get Driver Success',
  props<{ payload: DriverResultModel }>()
);

export const getDriverFailure = createAction('[DRIVER] Get Driver Faild');

const createDriver = createAction(
  '[DRIVER] Create Driver',
  props<{ payload: DriverModel }>()
);

const createDriverSuccess = createAction(
  '[DRIVER] Create Driver Success',
  props<{ payload: DriverResultModel }>()
);

export const createDriverFailure = createAction(
  '[DRIVER] Create Driver Faild',
  props<{ payload: DriverResultModel }>()
);

const updateDriver = createAction(
  '[DRIVER] Update Driver',
  props<{ payload: DriverModel }>()
);

const updateDriverSuccess = createAction(
  '[DRIVER] Update Driver Success',
  props<{ payload: DriverResultModel }>()
);

export const updateDriverFailure = createAction(
  '[DRIVER] Update Driver Faild',
  props<{ payload: DriverResultModel }>()
);

const deleteDriver = createAction(
  '[DRIVER] Delete Driver',
  props<{ payload: number }>()
);

const deleteDriverSuccess = createAction(
  '[DRIVER] Delete Driver Success',
  props<{ payload: DriverResultModel }>()
);

export const deleteDriverFailure = createAction(
  '[DRIVER] Delete Driver Faild',
  props<{ payload: DriverResultModel }>()
);

export const openDriverView = createAction('[DRIVER] Open Driver View');

export const DriversActions = {
  openDriverView,
  getDrivers,
  getDriversSuccess,
  getDriversFailure,
  getDriver,
  getDriverSuccess,
  getDriverFailure,
  createDriver,
  createDriverSuccess,
  createDriverFailure,
  updateDriver,
  updateDriverSuccess,
  updateDriverFailure,
  deleteDriver,
  deleteDriverSuccess,
  deleteDriverFailure,
};
