import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as formUsers from './user/reducer';
import * as fromSettings from './setting/reducer';
import * as fromAuthority from './authority/reducer';

import * as fromProvinces from './province/reducer';
import * as fromDistricts from './district/reducer';

import * as fromContractor from './contractor/reducer';
import * as fromTeam from './team/reducer';
import * as fromDriver from './driver/reducer';
import * as fromLorry from './lorry/reducer';
import * as fromWorker from './worker/reducer';

import * as fromCart from './cart/reducer';
import * as fromProduct from './product/reducer';

import * as fromProject from './project/reducer';
import * as fromCriterion from './criterion/reducer';
import * as fromCriteriaBundle from './criteria-bundle/reducer';

export interface AppState {
  users: formUsers.UserState;
  authorities: fromAuthority.AuthorityState;
  settings: fromSettings.State;

  districts: fromDistricts.DistrictState;
  provinces: fromProvinces.ProvinceState;

  lorries: fromLorry.LorryState;
  drivers: fromDriver.DriverState;

  workers: fromWorker.WorkerState;
  teams: fromTeam.TeamState;
  contractors: fromContractor.ContractorState;

  products: fromProduct.ProductState;
  carts: fromCart.State;

  projects: fromProject.ProjectState;
  criterions: fromCriterion.CriterionState;
  criteriaBundles: fromCriteriaBundle.CriteriaBundleState;
}

export const reducers: ActionReducerMap<AppState> = {
  users: formUsers.reducer,
  authorities: fromAuthority.reducer,
  settings: fromSettings.reducer,

  districts: fromDistricts.reducer,
  provinces: fromProvinces.reducer,

  lorries: fromLorry.reducer,
  drivers: fromDriver.reducer,

  teams: fromTeam.reducer,
  workers: fromWorker.reducer,
  contractors: fromContractor.reducer,

  products: fromProduct.reducer,
  carts: fromCart.reducer,

  projects: fromProject.reducer,
  criterions: fromCriterion.reducer,
  criteriaBundles: fromCriteriaBundle.reducer,
};

export const selectContainerState = createFeatureSelector<AppState>(
  'bussiness'
);
