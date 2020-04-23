import { createSelector } from '@ngrx/store';
import * as fromApp from '../reducers';
import * as fromCriteriaBundle from './';

export const getCriteriaBundleState = createSelector(
  fromApp.selectContainerState,
  (state: fromApp.AppState) => state.criteriaBundles
);

export const getCriteriaBundles = createSelector(
  getCriteriaBundleState,
  (state: fromCriteriaBundle.CriteriaBundleState) => state.list
);

export const getCriteriaBundle = createSelector(
  getCriteriaBundleState,
  (state: fromCriteriaBundle.CriteriaBundleState) => state.item
);

export const getCriteriaBundlesPagination = createSelector(
  getCriteriaBundleState,
  (state: fromCriteriaBundle.CriteriaBundleState) => state.pagination
);

export const getCriteriaBundlesParams = createSelector(
  getCriteriaBundleState,
  (state: fromCriteriaBundle.CriteriaBundleState) => state.params
);

export const getCriteriaBundlesLoading = createSelector(
  getCriteriaBundleState,
  (state: fromCriteriaBundle.CriteriaBundleState) => state.loading
);

export const getCriteriaBundleView = createSelector(
  getCriteriaBundleState,
  (state: fromCriteriaBundle.CriteriaBundleState) => state.modal
);

export const getCriteriaBundleCriterions = createSelector(
  getCriteriaBundleState,
  (state: fromCriteriaBundle.CriteriaBundleState) => state.criterions
);

export const ggetCriteriaBundleCriterionsLoading = createSelector(
  getCriteriaBundleState,
  (state: fromCriteriaBundle.CriteriaBundleState) => state.criterionsLoading
);
