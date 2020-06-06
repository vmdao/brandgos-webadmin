import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../@shared/shared.module';
import { LayoutModule } from '../layouts/layout.module';
import { AppUIModule } from '../app-ui.module';
import { AuthModule } from '../auth/auth.module';

import {
  PagesRoutingModule,
  COMPONENTS,
  ENTRIES_COMPONENTS,
} from './pages-routing.module';

import { reducers, effects, services } from './@store';

@NgModule({
  declarations: [...COMPONENTS, ...ENTRIES_COMPONENTS],
  imports: [
    AuthModule,
    CommonModule,
    AppUIModule,
    LayoutModule,
    SharedModule,
    PagesRoutingModule,
    StoreModule.forFeature('storeApp', reducers),
    EffectsModule.forFeature(effects),
  ],
  entryComponents: ENTRIES_COMPONENTS,
  providers: [...services],
})
export class PagesModule {}
