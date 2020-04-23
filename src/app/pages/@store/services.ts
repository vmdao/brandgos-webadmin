import { UserService } from './user';
import { AuthorityService } from './authority';
import { SettingService } from './setting';

import { DistrictService } from './district';
import { ProvinceService } from './province';

import { DriverService } from './driver';
import { LorryService } from './lorry';

import { WorkerService } from './worker';
import { TeamService } from './team';
import { ContractorService } from './contractor';

import { ProductService } from './product';
import { CartService } from './cart';

import { ProjectService } from './project';
import { CriterionService } from './criterion';
import { CriteriaBundleService } from './criteria-bundle';

export const services = [
  UserService,
  AuthorityService,
  SettingService,

  DistrictService,
  ProvinceService,

  DriverService,
  LorryService,

  WorkerService,
  TeamService,
  ContractorService,

  CartService,
  ProductService,

  ProjectService,
  CriterionService,
  CriteriaBundleService,
];
