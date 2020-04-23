import { RestService } from './rest.service';
import { StartupService } from './startup.service';
import { MenuService } from './menu/menu.service';
import { SettingService } from './setting/setting.service';
import { PermissionsService } from './permissions.service';

export * from './startup.service';
export * from './menu/menu.service';
export * from './setting/setting.service';
export * from './permissions.service';

export const services = [
  RestService,
  StartupService,
  MenuService,
  SettingService,
  PermissionsService
];
