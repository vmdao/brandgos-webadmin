import {
  Component,
  Input,
  TemplateRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { InputBoolean } from '@delon/util';
import { PageHeaderConfig } from '@delon/abc';
import { BrandService } from '@app/layouts/layout.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'page-header-wrapper',
  templateUrl: './page-header-wrapper.component.html',
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    '[class.alain-pro__page-header-wrapper]': 'true'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProPageHeaderWrapperComponent {
  // #region page-header fields

  @Input() title: string | TemplateRef<void>;
  @Input() @InputBoolean() loading = false;
  @Input() home: string;
  @Input() homeLink: string;
  @Input() homeI18n: string;

  @Input() @InputBoolean() autoBreadcrumb = true;

  @Input() @InputBoolean() autoTitle = true;

  @Input() @InputBoolean() syncTitle = true;
  @Input() breadcrumb: TemplateRef<void>;
  @Input() logo: TemplateRef<void>;
  @Input() action: TemplateRef<void>;
  @Input() content: TemplateRef<void>;
  @Input() extra: TemplateRef<void>;
  @Input() tab: TemplateRef<void>;
  @Input() phContent: TemplateRef<void>;

  @Input() top: TemplateRef<void>;
  @Input() @InputBoolean() noSpacing = false;
  @Input() style: {};

  constructor(public pro: BrandService, cog: PageHeaderConfig) {
    Object.assign(this, cog, { syncTitle: true });
  }
}
