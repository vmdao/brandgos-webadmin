import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { pipes } from './pipes';

import { directives } from './directives';
import { DebounceInputDirective } from './directives/debounce-input.directive';
import { CanAccessDirective } from '@app/@core/directives/can-access.directive';

import { UploadFileComponent } from './components/upload/upload.component';
import { CustomRateComponent } from './components/custom-rate/custom-rate.component';
import { ProPageGridComponent } from './components/page-grid/page-grid.component';
import { AppUIModule } from '../app-ui.module';

// Shared

@NgModule({
  declarations: [
    ...pipes,
    ...directives,
    DebounceInputDirective,
    CanAccessDirective,
    UploadFileComponent,
    CustomRateComponent,
    ProPageGridComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule,
    AppUIModule,
  ],
  exports: [
    ...pipes,
    ...directives,
    FormsModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    CanAccessDirective,
    TranslateModule,
    UploadFileComponent,
    ProPageGridComponent,
    CustomRateComponent,
  ],
})
export class SharedModule {}
