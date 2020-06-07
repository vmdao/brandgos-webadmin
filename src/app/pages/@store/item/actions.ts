import { createAction, props } from '@ngrx/store';

import { ItemModel } from './model';
import { ItemResultsModel, ItemResultModel } from './results.model';

const getItems = createAction('[ITEM] Get Items', props<{ payload: any }>());

const getItemsSuccess = createAction(
  '[ITEM] Get Items Success',
  props<{ payload: ItemResultsModel }>()
);

export const getItemsFailure = createAction('[ITEM] Get Items Faild');

const getItem = createAction('[ITEM] Get Item', props<{ payload: any }>());

const getItemSuccess = createAction(
  '[ITEM] Get Item Success',
  props<{ payload: ItemResultModel }>()
);

export const getItemFailure = createAction('[ITEM] Get Item Faild');

const createItem = createAction(
  '[ITEM] Create Item',
  props<{ payload: ItemModel }>()
);

const createItemSuccess = createAction(
  '[ITEM] Create Item Success',
  props<{ payload: ItemResultModel }>()
);

export const createItemFailure = createAction(
  '[ITEM] Create Item Faild',
  props<{ payload: ItemResultModel }>()
);

const updateItem = createAction(
  '[ITEM] Update Item',
  props<{ payload: ItemModel }>()
);

const updateItemSuccess = createAction(
  '[ITEM] Update Item Success',
  props<{ payload: ItemResultModel }>()
);

export const updateItemFailure = createAction(
  '[ITEM] Update Item Faild',
  props<{ payload: ItemResultModel }>()
);

const deleteItem = createAction(
  '[ITEM] Delete Item',
  props<{ payload: number }>()
);

const deleteItemSuccess = createAction(
  '[ITEM] Delete Item Success',
  props<{ payload: ItemResultModel }>()
);

export const deleteItemFailure = createAction(
  '[ITEM] Delete Item Faild',
  props<{ payload: ItemResultModel }>()
);
export const openItemView = createAction('[ITEM] Open Item View');

const getItemIcons = createAction(
  '[ITEM] Get Items Icons',
  props<{ payload: any }>()
);

const getItemIconsSuccess = createAction(
  '[ITEM] Get Items Icons Success',
  props<{ payload: ItemResultsModel }>()
);

export const getItemIconsFailure = createAction('[ITEM] Get Items Icons Faild');

const getItemShapes = createAction(
  '[ITEM] Get Items Shapes',
  props<{ payload: any }>()
);

const getItemShapesSuccess = createAction(
  '[ITEM] Get Items Shapes Success',
  props<{ payload: ItemResultsModel }>()
);

export const getItemShapesFailure = createAction(
  '[ITEM] Get Items Shapes Faild'
);

const getItemElements = createAction(
  '[ITEM] Get Items Elements',
  props<{ payload: any }>()
);

const getItemElementsSuccess = createAction(
  '[ITEM] Get Items Elements Success',
  props<{ payload: ItemResultsModel }>()
);

export const getItemElementsFailure = createAction(
  '[ITEM] Get Items Elements Faild'
);

const getItemIconsSearch = createAction(
  '[ITEM] Get Item Icons Search',
  props<{ payload: any }>()
);

const getItemIconsSearchSuccess = createAction(
  '[ITEM] Get Item Icons Search Success',
  props<{ payload: ItemResultsModel }>()
);

export const getItemIconsSearchFailure = createAction(
  '[ITEM] Get Item Icons Search Faild'
);

const render = createAction(
  '[ITEM] Update Item Redner',
  props<{ payload: { html: string } }>()
);

const renderSuccess = createAction(
  '[ITEM] Update Item Redner Success',
  props<{ payload: { data: any } }>()
);

export const renderFailure = createAction(
  '[ITEM] Update Item Redner Faild',
  props<{ payload: ItemResultModel }>()
);

export const ItemsActions = {
  render,
  renderSuccess,
  renderFailure,
  openItemView,
  getItemIcons,
  getItemIconsSuccess,
  getItemIconsFailure,
  getItemShapes,
  getItemShapesSuccess,
  getItemShapesFailure,
  getItemElements,
  getItemElementsSuccess,
  getItemElementsFailure,
  getItemIconsSearch,
  getItemIconsSearchSuccess,
  getItemIconsSearchFailure,
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
