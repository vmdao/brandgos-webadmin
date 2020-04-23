import { createSelector } from '@ngrx/store';
import * as fromBussiness from '../reducers';

export const getSettings = createSelector(
  fromBussiness.selectContainerState,
  (state: fromBussiness.AppState) => state.settings.server
);
