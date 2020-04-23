import { createAction, props } from '@ngrx/store';

import { LorryModel } from './model';
import { LorryResultsModel, LorryResultModel } from './results.model';

const getLorries = createAction(
  '[LORRY] Get Lorries',
  props<{ payload: any }>()
);

const getLorriesSuccess = createAction(
  '[LORRY] Get Lorries Success',
  props<{ payload: LorryResultsModel }>()
);

export const getLorriesFailure = createAction('[LORRY] Get Lorries Faild');

const getLorry = createAction('[LORRY] Get Lorry', props<{ payload: any }>());

const getLorriesuccess = createAction(
  '[LORRY] Get Lorry Success',
  props<{ payload: LorryResultModel }>()
);

export const getLorryFailure = createAction('[LORRY] Get Lorry Faild');

const createLorry = createAction(
  '[LORRY] Create Lorry',
  props<{ payload: LorryModel }>()
);

const createLorrySuccess = createAction(
  '[LORRY] Create Lorry Success',
  props<{ payload: LorryResultModel }>()
);

export const createLorryFailure = createAction(
  '[LORRY] Create Lorry Faild',
  props<{ payload: LorryResultModel }>()
);

const updateLorry = createAction(
  '[LORRY] Update Lorry',
  props<{ payload: LorryModel }>()
);

const updateLorrySuccess = createAction(
  '[LORRY] Update Lorry Success',
  props<{ payload: LorryResultModel }>()
);

export const updateLorryFailure = createAction(
  '[LORRY] Update Lorry Faild',
  props<{ payload: LorryResultModel }>()
);

const deleteLorry = createAction(
  '[LORRY] Delete Lorry',
  props<{ payload: number }>()
);

const deleteLorrySuccess = createAction(
  '[LORRY] Delete Lorry Success',
  props<{ payload: LorryResultModel }>()
);

export const deleteLorryFailure = createAction(
  '[LORRY] Delete Lorry Faild',
  props<{ payload: LorryResultModel }>()
);

export const openLorryView = createAction('[LORRY] Open Lorry View');

export const LorriesActions = {
  openLorryView,
  getLorries,
  getLorriesSuccess,
  getLorriesFailure,
  getLorry,
  getLorriesuccess,
  getLorryFailure,
  createLorry,
  createLorrySuccess,
  createLorryFailure,
  updateLorry,
  updateLorrySuccess,
  updateLorryFailure,
  deleteLorry,
  deleteLorrySuccess,
  deleteLorryFailure,
};
