import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule, COMPONENTS } from './auth-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer, AuthEffects } from './store';

import { AuthComponent } from './auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../@shared/shared.module';
import { AppUIModule } from '../app-ui.module';
import { LayoutModule } from '../layouts/layout.module';

@NgModule({
  declarations: [AuthComponent, ...COMPONENTS],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    AppUIModule,
    LayoutModule,
    EffectsModule.forFeature([AuthEffects]),
    StoreModule.forFeature('auth', reducer)
  ],
  providers: []
})
export class AuthModule {}
