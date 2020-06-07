import { createAction, props } from '@ngrx/store';

import { ItemModel } from './model';
import { ItemResultsModel, ItemResultModel } from './results.model';

const getItems = createAction(
  '[PRODUCT] Get Items',
  props<{ payload: any }>()
);

const getItemsSuccess = createAction(
  '[PRODUCT] Get Items Success',
  props<{ payload: ItemResultsModel }>()
);

export const getItemsFailure = createAction('[PRODUCT] Get Items Faild');

const getItem = createAction(
  '[PRODUCT] Get Item',
  props<{ payload: any }>()
);

const getItemSuccess = createAction(
  '[PRODUCT] Get Item Success',
  props<{ payload: ItemResultModel }>()
);

export const getItemFailure = createAction('[PRODUCT] Get Item Faild');

const createItem = createAction(
  '[PRODUCT] Create Item',
  props<{ payload: ItemModel }>()
);

const createItemSuccess = createAction(
  '[PRODUCT] Create Item Success',
  props<{ payload: ItemResultModel }>()
);

export const createItemFailure = createAction(
  '[PRODUCT] Create Item Faild',
  props<{ payload: ItemResultModel }>()
);

const updateItem = createAction(
  '[PRODUCT] Update Item',
  props<{ payload: ItemModel }>()
);

const updateItemSuccess = createAction(
  '[PRODUCT] Update Item Success',
  props<{ payload: ItemResultModel }>()
);

export const updateItemFailure = createAction(
  '[PRODUCT] Update Item Faild',
  props<{ payload: ItemResultModel }>()
);

const deleteItem = createAction(
  '[PRODUCT] Delete Item',
  props<{ payload: number }>()
);

const deleteItemSuccess = createAction(
  '[PRODUCT] Delete Item Success',
  props<{ payload: ItemResultModel }>()
);

export const deleteItemFailure = createAction(
  '[PRODUCT] Delete Item Faild',
  props<{ payload: ItemResultModel }>()
);
export const openItemView = createAction('[PRODUCT] Open Item View');

export const ItemsActions = {
  openItemView,
  getItems,
  getItemsSuccess,
  getItemsFailure,
  getItem,
  getItemSuccess,
  getItemFailure,
  createItem,
  createItemSuccess,
  createItemFailure,
  updateItem,
  updateItemSuccess,
  updateItemFailure,
  deleteItem,
  deleteItemSuccess,
  deleteItemFailure,
};
