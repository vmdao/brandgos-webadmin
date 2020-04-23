import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { MenuService, SettingService } from '@app/@core/services';

@Component({
  selector: 'app-layout-default-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class LayoutDefaultSidebarComponent implements OnInit, OnDestroy {
  @Input() isCollapsed: boolean;
  menus: any[] = [];
  roles: Array<string> = [];

  private unsubscribe$ = new Subject<void>();
  constructor(
    public menuService: MenuService,
    private settingService: SettingService
  ) {}

  ngOnInit() {
    this.menus = this.getMenus();
  }

  getMenus() {
    const { menuService, settingService } = this;
    const menus = menuService.menus;
    const roles = settingService.roles;
    return this.getMenuWithRoles(menus, roles);
  }

  getMenuWithRoles(menus, roles) {
    return menus.reduce((current, item) => {
      if (!Array.isArray(item.roles)) {
        return current;
      }

      const itemFound = item.roles.find(r => {
        return roles.includes(r);
      });

      if (!itemFound) {
        return current;
      }

      if (!Array.isArray(item.childs)) {
        current.push(item);
        return current;
      }

      const childs = this.getMenuWithRoles(item.childs, roles);
      if (childs.length < 1) {
        return current;
      }
      item.childs = childs;
      current.push(item);
      return current;
    }, []);
  }

  ngOnDestroy(): void {
    const { unsubscribe$ } = this;
    unsubscribe$.next();
    unsubscribe$.complete();
  }
}
