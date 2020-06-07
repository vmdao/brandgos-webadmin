import { createAction, props } from '@ngrx/store';

import { CollectionModel } from './model';
import { CollectionResultsModel, CollectionResultModel } from './results.model';

const getCollections = createAction(
  '[COLLECTION] Get Collections',
  props<{ payload: any }>()
);

const getCollectionsSuccess = createAction(
  '[COLLECTION] Get Collections Success',
  props<{ payload: CollectionResultsModel }>()
);

export const getCollectionsFailure = createAction(
  '[COLLECTION] Get Collections Faild'
);

const getCollection = createAction(
  '[COLLECTION] Get Collection',
  props<{ payload: any }>()
);

const getCollectionSuccess = createAction(
  '[COLLECTION] Get Collection Success',
  props<{ payload: CollectionResultModel }>()
);

export const getCollectionFailure = createAction(
  '[COLLECTION] Get Collection Faild'
);

const createCollection = createAction(
  '[COLLECTION] Create Collection',
  props<{ payload: CollectionModel }>()
);

const createCollectionSuccess = createAction(
  '[COLLECTION] Create Collection Success',
  props<{ payload: CollectionResultModel }>()
);

export const createCollectionFailure = createAction(
  '[COLLECTION] Create Collection Faild',
  props<{ payload: CollectionResultModel }>()
);

const updateCollection = createAction(
  '[COLLECTION] Update Collection',
  props<{ payload: CollectionModel }>()
);

const updateCollectionSuccess = createAction(
  '[COLLECTION] Update Collection Success',
  props<{ payload: CollectionResultModel }>()
);

export const updateCollectionFailure = createAction(
  '[COLLECTION] Update Collection Faild',
  props<{ payload: CollectionResultModel }>()
);

const deleteCollection = createAction(
  '[COLLECTION] Delete Collection',
  props<{ payload: number }>()
);

const deleteCollectionSuccess = createAction(
  '[COLLECTION] Delete Collection Success',
  props<{ payload: CollectionResultModel }>()
);
export const openCollectionView = createAction(
  '[Collection] Open Collection View'
);
export const deleteCollectionFailure = createAction(
  '[COLLECTION] Delete Collection Faild',
  props<{ payload: CollectionResultModel }>()
);

export const CollectionsActions = {
  openCollectionView,
  getCollections,
  getCollectionsSuccess,
  getCollectionsFailure,
  getCollection,
  getCollectionSuccess,
  getCollectionFailure,
  createCollection,
  createCollectionSuccess,
  createCollectionFailure,
  updateCollection,
  updateCollectionSuccess,
  updateCollectionFailure,
  deleteCollection,
  deleteCollectionSuccess,
  deleteCollectionFailure,
};
