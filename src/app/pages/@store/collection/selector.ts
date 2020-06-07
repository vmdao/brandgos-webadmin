import { createSelector } from '@ngrx/store';
import * as fromApp from '../reducers';
import * as fromCollection from './';

export const getCollectionState = createSelector(
  fromApp.selectContainerState,
  (state: fromApp.AppState) => state.collections
);

export const getCollections = createSelector(
  getCollectionState,
  (state: fromCollection.CollectionState) => state.list
);

export const getCollection = createSelector(
  getCollectionState,
  (state: fromCollection.CollectionState) => state.item
);

export const getCollectionsPagination = createSelector(
  getCollectionState,
  (state: fromCollection.CollectionState) => state.pagination
);

export const getCollectionsParams = createSelector(
  getCollectionState,
  (state: fromCollection.CollectionState) => state.params
);

export const getCollectionsLoading = createSelector(
  getCollectionState,
  (state: fromCollection.CollectionState) => state.loading
);

export const getCollectionView = createSelector(
  getCollectionState,
  (state: fromCollection.CollectionState) => state.modal
);
