import {
  Component,
  Input,
  OnDestroy,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  OnInit
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Menu, MenuService } from '@delon/theme';
import { InputBoolean } from '@delon/util';

import { BrandService } from '../../../layout.service';
import { ProMenu } from '../../../layout.types';
import { MenuService as M, SettingService } from '@app/@core/services';

@Component({
  // tslint:disable-next-line: component-selector
  selector: '[layout-pro-menu]',
  templateUrl: './menu.component.html',
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    '[class.alain-pro__menu]': 'true',
    '[class.alain-pro__menu-only-icon]': 'pro.onlyIcon'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutProMenuComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  menus: ProMenu[];

  @Input() @InputBoolean() disabledAcl = false;
  @Input() mode = 'inline';

  constructor(
    private menuSrv: MenuService,
    public menuService: M,
    private router: Router,
    public pro: BrandService,
    private cdr: ChangeDetectorRef,
    private settingService: SettingService
  ) {}

  private cd() {
    this.cdr.markForCheck();
  }

  private genMenus(data: Menu[]) {
    const res: ProMenu[] = [];
    // ingores category menus
    const roles = this.settingService.roles;
    const ingoreCategores = data.reduce(
      (prev, cur) => prev.concat(cur.children),
      []
    );

    this.menuSrv.visit(ingoreCategores, (item, parent) => {
      if (!item._aclResult) {
        if (this.disabledAcl) {
          item.disabled = true;
        } else {
          item._hidden = true;
        }
      }

      if (item.roles.length > 0) {
        const itemFound = item.roles.find(r => {
          return roles.includes(r);
        });
        // console.log(item.text, item.roles, itemFound);
        if (!itemFound) {
          item._hidden = true;
          return;
        }
      }

      if (item._hidden === true) {
        return;
      }
      if (parent === null) {
        res.push(item);
      }
    });

    this.menus = res;

    this.openStatus();
  }

  private openStatus() {
    const inFn = (list: ProMenu[]) => {
      for (const i of list) {
        i._open = false;
        i._selected = false;
        if (i.children.length > 0) {
          inFn(i.children);
        }
      }
    };
    inFn(this.menus);

    let item = this.menuSrv.getHit(this.menus, this.router.url, true);
    if (!item) {
      this.cd();
      return;
    }
    do {
      item._selected = true;
      if (!this.pro.isTopMenu && !this.pro.collapsed) {
        item._open = true;
      }
      item = item.__parent;
    } while (item);
    this.cd();
  }

  openChange(item: ProMenu, statue: boolean) {
    const data = item.__parent ? item.__parent.children : this.menus;
    // tslint:disable-next-line: curly
    if (data && data.length <= 1) return;
    data.forEach(i => (i._open = false));
    item._open = statue;
  }

  closeCollapsed() {
    const { pro } = this;
    if (pro.isMobile) {
      setTimeout(() => pro.setCollapsed(true), 25);
    }
  }

  ngOnInit() {
    const { unsubscribe$, router, pro } = this;
    this.menuSrv.change
      .pipe(takeUntil(unsubscribe$))
      .subscribe(res => this.genMenus(res));

    router.events
      .pipe(
        takeUntil(unsubscribe$),
        filter(e => e instanceof NavigationEnd)
      )
      .subscribe(() => this.openStatus());

    pro.notify
      .pipe(
        takeUntil(unsubscribe$),
        filter(() => !!this.menus)
      )
      .subscribe(() => this.cd());
  }

  ngOnDestroy() {
    const { unsubscribe$ } = this;
    unsubscribe$.next();
    unsubscribe$.complete();
  }
}
