import { createAction, props } from '@ngrx/store';

import { TemplateModel } from './model';
import { TemplateResultsModel, TemplateResultModel } from './results.model';

const getTemplates = createAction('[TEMPLATE] Get Templates', props<{ payload: any }>());

const getTemplatesSuccess = createAction(
  '[TEMPLATE] Get Templates Success',
  props<{ payload: TemplateResultsModel }>()
);

export const getTemplatesFailure = createAction('[TEMPLATE] Get Templates Faild');

const getTemplate = createAction('[TEMPLATE] Get Template', props<{ payload: any }>());

const getTemplateSuccess = createAction(
  '[TEMPLATE] Get Template Success',
  props<{ payload: TemplateResultModel }>()
);

export const getTemplateFailure = createAction('[TEMPLATE] Get Template Faild');

const createTemplate = createAction(
  '[TEMPLATE] Create Template',
  props<{ payload: TemplateModel }>()
);

const createTemplateSuccess = createAction(
  '[TEMPLATE] Create Template Success',
  props<{ payload: TemplateResultModel }>()
);

export const createTemplateFailure = createAction(
  '[TEMPLATE] Create Template Faild',
  props<{ payload: TemplateResultModel }>()
);

const updateTemplate = createAction(
  '[TEMPLATE] Update Template',
  props<{ payload: TemplateModel }>()
);

const updateTemplateSuccess = createAction(
  '[TEMPLATE] Update Template Success',
  props<{ payload: TemplateResultModel }>()
);

export const updateTemplateFailure = createAction(
  '[TEMPLATE] Update Template Faild',
  props<{ payload: TemplateResultModel }>()
);

const deleteTemplate = createAction(
  '[TEMPLATE] Delete Template',
  props<{ payload: number }>()
);

const deleteTemplateSuccess = createAction(
  '[TEMPLATE] Delete Template Success',
  props<{ payload: TemplateResultModel }>()
);

export const deleteTemplateFailure = createAction(
  '[TEMPLATE] Delete Template Faild',
  props<{ payload: TemplateResultModel }>()
);
export const openTemplateView = createAction('[TEMPLATE] Open Template View');

const getTemplateIcons = createAction(
  '[TEMPLATE] Get Templates Icons',
  props<{ payload: any }>()
);

const getTemplateIconsSuccess = createAction(
  '[TEMPLATE] Get Templates Icons Success',
  props<{ payload: TemplateResultsModel }>()
);

export const getTemplateIconsFailure = createAction('[TEMPLATE] Get Templates Icons Faild');

const getTemplateShapes = createAction(
  '[TEMPLATE] Get Templates Shapes',
  props<{ payload: any }>()
);

const getTemplateShapesSuccess = createAction(
  '[TEMPLATE] Get Templates Shapes Success',
  props<{ payload: TemplateResultsModel }>()
);

export const getTemplateShapesFailure = createAction(
  '[TEMPLATE] Get Templates Shapes Faild'
);

const getTemplateElements = createAction(
  '[TEMPLATE] Get Templates Elements',
  props<{ payload: any }>()
);

const getTemplateElementsSuccess = createAction(
  '[TEMPLATE] Get Templates Elements Success',
  props<{ payload: TemplateResultsModel }>()
);

export const getTemplateElementsFailure = createAction(
  '[TEMPLATE] Get Templates Elements Faild'
);

const getTemplateIconsSearch = createAction(
  '[TEMPLATE] Get Template Icons Search',
  props<{ payload: any }>()
);

const getTemplateIconsSearchSuccess = createAction(
  '[TEMPLATE] Get Template Icons Search Success',
  props<{ payload: TemplateResultsModel }>()
);

export const getTemplateIconsSearchFailure = createAction(
  '[TEMPLATE] Get Template Icons Search Faild'
);

const render = createAction(
  '[TEMPLATE] Update Template Redner',
  props<{ payload: { html: string } }>()
);

const renderSuccess = createAction(
  '[TEMPLATE] Update Template Redner Success',
  props<{ payload: { data: any } }>()
);

export const renderFailure = createAction(
  '[TEMPLATE] Update Template Redner Faild',
  props<{ payload: TemplateResultModel }>()
);

export const TemplatesActions = {
  render,
  renderSuccess,
  renderFailure,
  openTemplateView,
  getTemplateIcons,
  getTemplateIconsSuccess,
  getTemplateIconsFailure,
  getTemplateShapes,
  getTemplateShapesSuccess,
  getTemplateShapesFailure,
  getTemplateElements,
  getTemplateElementsSuccess,
  getTemplateElementsFailure,
  getTemplateIconsSearch,
  getTemplateIconsSearchSuccess,
  getTemplateIconsSearchFailure,
  getTemplates,
  getTemplatesSuccess,
  getTemplatesFailure,
  getTemplate,
  getTemplateSuccess,
  getTemplateFailure,
  createTemplate,
  createTemplateSuccess,
  createTemplateFailure,
  updateTemplate,
  updateTemplateSuccess,
  updateTemplateFailure,
  deleteTemplate,
  deleteTemplateSuccess,
  deleteTemplateFailure,
};
