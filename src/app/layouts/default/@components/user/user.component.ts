import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/auth/services';
import { SettingService } from '@app/@core/services';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'layout-pro-user',
  templateUrl: 'user.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutProWidgetUserComponent {
  constructor(
    public settings: SettingService,
    private router: Router,
    private authService: AuthenticationService
  ) {}

  logout() {
    this.authService.logout();
    const { urls } = this.settings;
    this.router.navigateByUrl(urls.login);
  }
}
