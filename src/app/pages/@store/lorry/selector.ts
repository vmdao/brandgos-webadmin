import { createSelector } from '@ngrx/store';
import * as fromApp from '../reducers';
import * as fromLorry from './';

export const getLorriestate = createSelector(
  fromApp.selectContainerState,
  (state: fromApp.AppState) => state.lorries
);

export const getLorries = createSelector(
  getLorriestate,
  (state: fromLorry.LorryState) => state.list
);

export const getLorry = createSelector(
  getLorriestate,
  (state: fromLorry.LorryState) => state.item
);

export const getLorriesPagination = createSelector(
  getLorriestate,
  (state: fromLorry.LorryState) => state.pagination
);

export const getLorriesParams = createSelector(
  getLorriestate,
  (state: fromLorry.LorryState) => state.params
);

export const getLorriesLoading = createSelector(
  getLorriestate,
  (state: fromLorry.LorryState) => state.loading
);

export const getLorryView = createSelector(
  getLorriestate,
  (state: fromLorry.LorryState) => state.modal
);
