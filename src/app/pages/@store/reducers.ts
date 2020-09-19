import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as formUsers from './user/reducer';
import * as fromSettings from './setting/reducer';
import * as fromAuthority from './authority/reducer';

import * as fromTeam from './team/reducer';

import * as fromCart from './cart/reducer';
import * as fromProduct from './product/reducer';

import * as fromProject from './project/reducer';
import * as fromItem from './item/reducer';
import * as fromColletion from './collection/reducer';
import * as fromTemplate from './template/reducer';

export interface AppState {
  users: formUsers.UserState;
  authorities: fromAuthority.AuthorityState;
  settings: fromSettings.State;

  teams: fromTeam.TeamState;

  products: fromProduct.ProductState;
  carts: fromCart.State;

  projects: fromProject.ProjectState;
  items: fromItem.ItemState;
  collections: fromColletion.CollectionState;
  templates: fromTemplate.TemplateState;
}

export const reducers: ActionReducerMap<AppState> = {
  users: formUsers.reducer,
  authorities: fromAuthority.reducer,
  settings: fromSettings.reducer,

  teams: fromTeam.reducer,

  products: fromProduct.reducer,
  carts: fromCart.reducer,

  projects: fromProject.reducer,
  items: fromItem.reducer,
  collections: fromColletion.reducer,
  templates: fromTemplate.reducer,
};

export const selectContainerState = createFeatureSelector<AppState>('storeApp');
