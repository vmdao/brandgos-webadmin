import { createSelector } from '@ngrx/store';
import * as fromApp from '../reducers';
import * as fromContractor from './';

export const getContractorState = createSelector(
  fromApp.selectContainerState,
  (state: fromApp.AppState) => state.contractors
);

export const getContractors = createSelector(
  getContractorState,
  (state: fromContractor.ContractorState) => state.list
);

export const getContractor = createSelector(
  getContractorState,
  (state: fromContractor.ContractorState) => state.item
);

export const getContractorsPagination = createSelector(
  getContractorState,
  (state: fromContractor.ContractorState) => state.pagination
);

export const getContractorsParams = createSelector(
  getContractorState,
  (state: fromContractor.ContractorState) => state.params
);

export const getContractorsLoading = createSelector(
  getContractorState,
  (state: fromContractor.ContractorState) => state.loading
);

export const getContractorView = createSelector(
  getContractorState,
  (state: fromContractor.ContractorState) => state.modal
);
