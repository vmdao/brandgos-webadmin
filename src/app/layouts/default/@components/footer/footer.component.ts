import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SettingsService } from '@delon/theme';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'layout-pro-footer',
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutProFooterComponent {
  get year() {
    return this.setting.app.year;
  }
  constructor(private setting: SettingsService) {}
}
