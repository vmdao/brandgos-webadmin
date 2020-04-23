import { createSelector } from '@ngrx/store';
import * as fromApp from '../reducers';
import * as fromWorker from './';
import * as fromTeam from '../team';

export const getWorkerState = createSelector(
  fromApp.selectContainerState,
  (state: fromApp.AppState) => state.workers
);

export const getWorkers = createSelector(
  getWorkerState,
  (state: fromWorker.WorkerState) => state.list
);

export const getWorker = createSelector(
  getWorkerState,
  (state: fromWorker.WorkerState) => state.item
);

export const getWorkersPagination = createSelector(
  getWorkerState,
  (state: fromWorker.WorkerState) => state.pagination
);

export const getWorkersParams = createSelector(
  getWorkerState,
  (state: fromWorker.WorkerState) => state.params
);

export const getWorkersLoading = createSelector(
  getWorkerState,
  (state: fromWorker.WorkerState) => state.loading
);

export const getWorkerView = createSelector(
  getWorkerState,
  (state: fromWorker.WorkerState) => state.modal
);

export const getLeadersIdle = createSelector(
  getWorkerState,
  (state: fromWorker.WorkerState) => state.leadersIdle
);

export const getLeadersIdleLoading = createSelector(
  getWorkerState,
  (state: fromWorker.WorkerState) => state.leadersIdleLoading
);
export const getWorkersIdle = createSelector(
  getWorkerState,
  fromTeam.getTeamMembers,
  (state: fromWorker.WorkerState, membersInTeam) => {
    return state.workersIdle.map((worker) => {
      const inTeam = membersInTeam.findIndex((m) => m.id === worker.id);
      return { ...worker, actived: inTeam >= 0 };
    });
  }
);
export const getWorkersIdleLoading = createSelector(
  getWorkerState,
  (state: fromWorker.WorkerState) => state.workersIdleLoading
);

export const getWorkersIdlePagination = createSelector(
  getWorkerState,
  (state: fromWorker.WorkerState) => state.workersIdlePagination
);
