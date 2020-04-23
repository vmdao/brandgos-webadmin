import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { zip } from 'rxjs';
import { catchError } from 'rxjs/operators';
// import { MenuService } from './menu/menu.service';
import { SettingService } from './setting/setting.service';
import { TranslateService } from '@ngx-translate/core';
import { MenuService } from '@delon/theme';
// import { AuthenticationService } from '@app/auth/services';

@Injectable({ providedIn: 'root' })
export class StartupService {
  constructor(
    private httpClient: HttpClient,
    private menuService: MenuService,
    private settingService: SettingService,
    private translateService: TranslateService
  ) {}

  init(): void {}

  load(): Promise<any> {
    return new Promise((resolve) => {
      zip(
        this.httpClient.get(`assets/data/i18n/vi-data.json`),
        this.httpClient.get('assets/data/app-data.json')
      )
        .pipe(
          catchError(([langData, appData]) => {
            resolve(null);
            return [langData, appData];
          })
        )
        .subscribe(
          ([langData, appData]) => {
            // setting language data
            this.translateService.setTranslation('vi', langData);
            this.translateService.setDefaultLang('vi');

            this.menuService.add(appData?.menu);

            this.settingService.setApp(appData?.app);
            this.settingService.setPaths(appData?.paths);
          },
          () => {},
          () => {
            resolve(null);
          }
        );
    });
  }
}
