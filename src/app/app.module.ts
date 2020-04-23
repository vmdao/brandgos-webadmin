import { NgModule, APP_INITIALIZER } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { JwtInterceptor, ErrorInterceptor } from '@app/@core/helpers';
import { services, StartupService } from '@app/@core/services';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment as env } from '@env/environment';
import { AppComponent } from './app.component';
import { reducers, metaReducers, CustomRouterStateSerializer } from './@store';
import { AuthModule } from './auth/auth.module';
import { AppUIModule } from './app-ui.module';
import { AppRoutingModule } from './app-routing.module';

// import { NgxOneSignalModule, OneSignalService } from 'ngx-onesignal-plus';

import {
  StoreRouterConnectingModule,
  RouterStateSerializer,
  DefaultRouterStateSerializer,
} from '@ngrx/router-store';
import { SharedModule } from './@shared/shared.module';

import en from '@angular/common/locales/en';
import { registerLocaleData } from '@angular/common';
// import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
registerLocaleData(en);

export function I18nHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, `assets/data/i18n/`, '.json');
}

export function StartupServiceFactory(startupService: StartupService) {
  return () => startupService.load();
}

const APPINIT_PROVIDES = [
  StartupService,
  {
    provide: APP_INITIALIZER,
    useFactory: StartupServiceFactory,
    deps: [StartupService],
    multi: true,
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppUIModule,
    AuthModule,
    SharedModule,
    BrowserAnimationsModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    StoreRouterConnectingModule.forRoot({
      serializer: DefaultRouterStateSerializer,
      stateKey: 'router', // name of reducer key
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: I18nHttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    // NgxOneSignalModule.forRoot({
    //   appId: environment.oneSignalKey,
    //   autoResubscribe: true,
    //   notificationClickHandlerMatch: 'exact',
    //   notificationClickHandlerAction: 'navigate',
    //   notifyButton: {
    //     enable: true
    //   }
    // })
    // ServiceWorkerModule.register('OneSignalSDKWorker.js', {
    //   enabled: env.production
    // })
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
    ...services,

    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // OneSignalService,
    ...APPINIT_PROVIDES,
  ],
  bootstrap: [AppComponent],
  exports: [TranslateModule, RouterModule],
})
export class AppModule {}
