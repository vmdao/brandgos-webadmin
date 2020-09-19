import { createSelector } from '@ngrx/store';
import * as fromApp from '../reducers';
import * as fromTemplate from '.';

export const getTemplateState = createSelector(
  fromApp.selectContainerState,
  (state: fromApp.AppState) => state.templates
);

export const getTemplates = createSelector(
  getTemplateState,
  (state: fromTemplate.TemplateState) => state.list
);

export const getTemplate = createSelector(
  getTemplateState,
  (state: fromTemplate.TemplateState) => state.template
);

export const getTemplatesPagination = createSelector(
  getTemplateState,
  (state: fromTemplate.TemplateState) => state.pagination
);

export const getTemplatesParams = createSelector(
  getTemplateState,
  (state: fromTemplate.TemplateState) => state.params
);

export const getTemplatesLoading = createSelector(
  getTemplateState,
  (state: fromTemplate.TemplateState) => state.loading
);

export const getTemplateView = createSelector(
  getTemplateState,
  (state: fromTemplate.TemplateState) => state.modal
);

export const getTemplateIcons = createSelector(
  getTemplateState,
  (state: fromTemplate.TemplateState) => state.icons
);

export const getTemplateIconsLoading = createSelector(
  getTemplateState,
  (state: fromTemplate.TemplateState) => state.iconsLoading
);

export const getTemplateShapes = createSelector(
  getTemplateState,
  (state: fromTemplate.TemplateState) => state.shapes
);

export const getTemplateShapesLoading = createSelector(
  getTemplateState,
  (state: fromTemplate.TemplateState) => state.shapesLoading
);

export const getTemplateElements = createSelector(
  getTemplateState,
  (state: fromTemplate.TemplateState) => state.elements
);

export const getTemplateElementsLoading = createSelector(
  getTemplateState,
  (state: fromTemplate.TemplateState) => state.elementsLoading
);
export const getRenderData = createSelector(
  getTemplateState,
  (state: fromTemplate.TemplateState) => state.renderData
);

export const getRenderLoading = createSelector(
  getTemplateState,
  (state: fromTemplate.TemplateState) => state.renderLoading
);
