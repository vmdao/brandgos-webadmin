import * as jQuery from 'jquery';

import { Command } from '../command';

export interface MenuItemDto {
  icon?: string;
  name?: string;
  children?: Array<BaseMenuItemUI>;
  actions?: Array<Command>;
}

export interface MenuItemActionDto {
  event?: string;
  command: Command;
}

export abstract class BaseMenuItemUI {
  code: string;
  contentName: string;
  contentIcon: string;
  children: Array<{ BaseMenuItemUI }>;
  actions: Array<MenuItemActionDto>;
  options: MenuItemDto;

  $dom;
  $domWrapper;

  html = '';
  htmlWrapper = '';

  isActive = false;

  constructor(options: MenuItemDto) {
    this.configOption(options);
    this.htmlWrapper = `<li class="toolbar__item
    ${this.code ? 'toolbar__item--' + this.code : ''} 
    ${this.isActive ? 'toolbar__item--active' : ''}">
    </li>`;
  }

  configOption(options) {
    this.contentName = options.name || '';
    this.contentIcon = options.icon || '';
    this.children = options.children || [];
    this.actions = options.actions || [];
  }

  render() {
    this.$dom = jQuery(this.html);
    this.$domWrapper = jQuery(this.htmlWrapper);
    this.$domWrapper.append(this.$dom);
    this.setCommands();
    return this;
  }

  setCommands() {
    this.actions.forEach((action: MenuItemActionDto) => {
      this.setCommand(action);
    });
  }

  setCommand(action) {
    throw new Error('Need implement this funcion');
  }

  getHtml() {
    return this.html;
  }

  appendTo(selector) {
    this.$domWrapper.appendTo(selector);
    return this;
  }
}
