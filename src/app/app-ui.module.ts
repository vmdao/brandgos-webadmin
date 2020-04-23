import { NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';

import { AlainThemeModule } from '@delon/theme';
import { DelonABCModule } from '@delon/abc';
import { DelonACLModule } from '@delon/acl';
import { AgmCoreModule } from '@agm/core';
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';
import { NZ_I18N, vi_VN, NgZorroAntdModule } from 'ng-zorro-antd';
// import { AmChartsModule } from '@amcharts/amcharts4/core';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2Mixpanel } from 'angulartics2/mixpanel';

registerLocaleData(vi);

@NgModule({
  imports: [
    ToastrModule.forRoot({
      preventDuplicates: true,
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAh5sGTrjeMAEHbuzRrrqQh0l2_ot8n59w',
    }),
    Angulartics2Module.forRoot(),
    ToastContainerModule,
    AlainThemeModule,
    DelonABCModule,
    DelonACLModule,
    NgZorroAntdModule,
    // AmChartsModule,
  ],
  exports: [
    DelonABCModule,
    AlainThemeModule,
    DelonACLModule,
    NgZorroAntdModule,
    AgmCoreModule,
    Angulartics2Module,
  ],
  providers: [{ provide: NZ_I18N, useValue: vi_VN }],
})
export class AppUIModule {}
