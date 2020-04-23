import { UserEffects } from './user/effects';
import { AuthorityEffects } from './authority/effects';
import { SettingEffects } from './setting/effects';

import { DistrictEffects } from './district/effects';
import { ProvinceEffects } from './province/effects';

import { WorkerEffects } from './worker/effects';
import { TeamEffects } from './team/effects';
import { ContractorEffects } from './contractor/effects';

import { DriverEffects } from './driver/effects';
import { LorryEffects } from './lorry/effects';

import { ProductEffects } from './product/effects';
import { CartEffects } from './cart/effects';

import { ProjectEffects } from './project/effects';
import { CriterionEffects } from './criterion/effects';
import { CriteriaBundleEffects } from './criteria-bundle/effects';

export const effects: any[] = [
  UserEffects,
  AuthorityEffects,
  SettingEffects,

  DistrictEffects,
  ProvinceEffects,

  DriverEffects,
  LorryEffects,

  WorkerEffects,
  TeamEffects,
  ContractorEffects,

  ProductEffects,
  CartEffects,

  ProjectEffects,
  CriterionEffects,
  CriteriaBundleEffects,
];
