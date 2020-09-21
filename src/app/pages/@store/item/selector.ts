import { createSelector } from '@ngrx/store';
import * as fromApp from '../reducers';
import * as fromItem from '.';

export const getItemState = createSelector(
  fromApp.selectContainerState,
  (state: fromApp.AppState) => state.items
);

export const getItems = createSelector(
  getItemState,
  (state: fromItem.ItemState) => state.list
);

export const getItem = createSelector(
  getItemState,
  (state: fromItem.ItemState) => state.item
);

export const getItemsPagination = createSelector(
  getItemState,
  (state: fromItem.ItemState) => state.pagination
);

export const getItemsParams = createSelector(
  getItemState,
  (state: fromItem.ItemState) => state.params
);

export const getItemsLoading = createSelector(
  getItemState,
  (state: fromItem.ItemState) => state.loading
);

export const getItemView = createSelector(
  getItemState,
  (state: fromItem.ItemState) => state.modal
);

export const getItemIcons = createSelector(
  getItemState,
  (state: fromItem.ItemState) => state.icons
);

export const getItemIconsLoading = createSelector(
  getItemState,
  (state: fromItem.ItemState) => state.iconsLoading
);

export const getItemShapes = createSelector(
  getItemState,
  (state: fromItem.ItemState) => state.shapes
);

export const getItemShapesLoading = createSelector(
  getItemState,
  (state: fromItem.ItemState) => state.shapesLoading
);

export const getItemElements = createSelector(
  getItemState,
  (state: fromItem.ItemState) => state.elements
);

export const getItemElementsLoading = createSelector(
  getItemState,
  (state: fromItem.ItemState) => state.elementsLoading
);
