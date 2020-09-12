import { NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';

import { AlainThemeModule } from '@delon/theme';
import { DelonABCModule } from '@delon/abc';
import { DelonACLModule } from '@delon/acl';
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';
import { NZ_I18N, vi_VN, NgZorroAntdModule } from 'ng-zorro-antd';
import { Angulartics2Module } from 'angulartics2';

registerLocaleData(vi);

@NgModule({
  imports: [
    ToastrModule.forRoot({
      preventDuplicates: true,
    }),
    Angulartics2Module.forRoot(),
    ToastContainerModule,
    AlainThemeModule,
    DelonABCModule,
    DelonACLModule,
    NgZorroAntdModule,
  ],
  exports: [
    DelonABCModule,
    AlainThemeModule,
    DelonACLModule,
    NgZorroAntdModule,
    Angulartics2Module,
  ],
  providers: [{ provide: NZ_I18N, useValue: vi_VN }],
})
export class AppUIModule {}
