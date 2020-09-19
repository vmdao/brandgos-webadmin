import { UserEffects } from './user/effects';
import { AuthorityEffects } from './authority/effects';
import { SettingEffects } from './setting/effects';

import { TeamEffects } from './team/effects';

import { ProductEffects } from './product/effects';
import { CartEffects } from './cart/effects';

import { ProjectEffects } from './project/effects';
import { ItemEffects } from './item/effects';
import { CollectionEffects } from './collection/effects';
import { TemplateEffects } from './template/effects';

export const effects: any[] = [
  UserEffects,
  AuthorityEffects,
  SettingEffects,

  TeamEffects,

  ProductEffects,
  CartEffects,

  ProjectEffects,
  ItemEffects,
  CollectionEffects,
  TemplateEffects,
];
