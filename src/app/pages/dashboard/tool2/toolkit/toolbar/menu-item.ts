import * as jQuery from 'jquery';
import { BaseMenuItem } from '../basebar/menu-item.abstract';
import { BaseMenuItemUI } from '../basebar/ui.asbtract';
export class ToolbarMenuItem extends BaseMenuItem {
  htmlWrapper = '';
  constructor(options: { menuItemUi: BaseMenuItemUI }) {
    super(options);
  }
}
