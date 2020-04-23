import { createSelector } from '@ngrx/store';
import * as fromApp from '../reducers';
import * as fromCriterion from './';

export const getCriterionState = createSelector(
  fromApp.selectContainerState,
  (state: fromApp.AppState) => state.criterions
);

export const getCriterions = createSelector(
  getCriterionState,
  (state: fromCriterion.CriterionState) => state.list
);

export const getCriterion = createSelector(
  getCriterionState,
  (state: fromCriterion.CriterionState) => state.item
);

export const getCriterionsPagination = createSelector(
  getCriterionState,
  (state: fromCriterion.CriterionState) => state.pagination
);

export const getCriterionsParams = createSelector(
  getCriterionState,
  (state: fromCriterion.CriterionState) => state.params
);

export const getCriterionsLoading = createSelector(
  getCriterionState,
  (state: fromCriterion.CriterionState) => state.loading
);

export const getCriterionView = createSelector(
  getCriterionState,
  (state: fromCriterion.CriterionState) => state.modal
);
