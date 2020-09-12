import * as jQuery from 'jquery';
import { BaseMenuItemUI } from './ui.asbtract';
export abstract class BaseMenuItem {
  $dom: any;
  where: string;
  type: string;
  enabled = true;
  visiable = true;
  menuItemUi?: BaseMenuItemUI;
  htmlWrapper = '';
  constructor(option: { menuItemUi: BaseMenuItemUI }) {
    this.menuItemUi = option.menuItemUi;
    this.$dom = jQuery(this.htmlWrapper);
  }

  setEnable() {
    this.enabled = true;
  }

  setDisable() {
    this.enabled = false;
  }

  setVisiable() {
    this.visiable = true;
  }

  setHide() {
    this.visiable = false;
  }
}
