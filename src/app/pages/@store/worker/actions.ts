import { createAction, props } from '@ngrx/store';

import { WorkerModel } from './model';
import { WorkerResultsModel, WorkerResultModel } from './results.model';

const getWorkers = createAction(
  '[WORKER] Get Workers',
  props<{ payload: any }>()
);

const getWorkersSuccess = createAction(
  '[WORKER] Get Workers Success',
  props<{ payload: WorkerResultsModel }>()
);

export const getWorkersFailure = createAction('[WORKER] Get Workers Faild');

const getWorker = createAction(
  '[WORKER] Get Worker',
  props<{ payload: any }>()
);

const getWorkerSuccess = createAction(
  '[WORKER] Get Worker Success',
  props<{ payload: WorkerResultModel }>()
);

export const getWorkerFailure = createAction('[WORKER] Get Worker Faild');

const createWorker = createAction(
  '[WORKER] Create Worker',
  props<{ payload: WorkerModel }>()
);

const createWorkerSuccess = createAction(
  '[WORKER] Create Worker Success',
  props<{ payload: WorkerResultModel }>()
);

export const createWorkerFailure = createAction(
  '[WORKER] Create Worker Faild',
  props<{ payload: WorkerResultModel }>()
);

const updateWorker = createAction(
  '[WORKER] Update Worker',
  props<{ payload: WorkerModel }>()
);

const updateWorkerSuccess = createAction(
  '[WORKER] Update Worker Success',
  props<{ payload: WorkerResultModel }>()
);

export const updateWorkerFailure = createAction(
  '[WORKER] Update Worker Faild',
  props<{ payload: WorkerResultModel }>()
);

const deleteWorker = createAction(
  '[WORKER] Delete Worker',
  props<{ payload: number }>()
);

const deleteWorkerSuccess = createAction(
  '[WORKER] Delete Worker Success',
  props<{ payload: WorkerResultModel }>()
);

export const deleteWorkerFailure = createAction(
  '[WORKER] Delete Worker Faild',
  props<{ payload: WorkerResultModel }>()
);

export const openWorkerView = createAction('[WORKER] Open Worker View');

const getLeadersIdle = createAction(
  '[WORKER] Get Leaders Idle',
  props<{ payload: any }>()
);

const getLeadersIdleSuccess = createAction(
  '[WORKER] Get Leaders Idle Success',
  props<{ payload: WorkerResultsModel }>()
);

export const getLeadersIdleFailure = createAction(
  '[WORKER] Get Leaders Idle Faild'
);

const getWorkersIdle = createAction(
  '[WORKER] Get Workers Idle',
  props<{ payload: any }>()
);

const getWorkersIdleSuccess = createAction(
  '[WORKER] Get Workers Idle Success',
  props<{ payload: WorkerResultsModel }>()
);

export const getWorkersIdleFailure = createAction(
  '[WORKER] Get Workers Idle Faild'
);

export const WorkersActions = {
  getWorkersIdle,
  getWorkersIdleSuccess,
  getWorkersIdleFailure,
  getLeadersIdle,
  getLeadersIdleSuccess,
  getLeadersIdleFailure,
  openWorkerView,
  getWorkers,
  getWorkersSuccess,
  getWorkersFailure,
  getWorker,
  getWorkerSuccess,
  getWorkerFailure,
  createWorker,
  createWorkerSuccess,
  createWorkerFailure,
  updateWorker,
  updateWorkerSuccess,
  updateWorkerFailure,
  deleteWorker,
  deleteWorkerSuccess,
  deleteWorkerFailure,
};
