import * as jQuery from 'jquery';

import { Command } from '../command';
import { OnViewed } from '../../lifecycle';

export interface MenuItemDto {
  type?: string;
  code?: string;
  icon?: string;
  name?: string;
  children?: Array<BaseMenuItemUI>;
  actions?: Array<Command>;
}

export interface MenuItemActionDto {
  event?: string;
  command: Command;
}

export abstract class BaseMenuItemUI implements OnViewed {
  code: string;
  type: string;
  contentName: string;
  contentIcon: string;
  children: Array<{ BaseMenuItemUI }>;
  actions: Array<MenuItemActionDto>;
  options: MenuItemDto;
  position: string;
  $el;
  $elWrapper;

  html = '';
  htmlWrapper = '';

  context: {
    isActive?: boolean;
    color?: string;
    min?: number;
    max?: number;
    step?: number;
    valueDefault?: any;
  } = {};

  constructor(options: MenuItemDto) {
    this.configOption(options);
    this.htmlWrapper = `<li class="toolbar__item
    ${this.code ? 'toolbar__item--' + this.code : ''} ${
      this.position ? 'toolbar__item--' + this.position : ''
    }""></li>`;
  }

  configOption(options) {
    this.context = options.context || { isActive: false };
    this.contentName = options.name || '';
    this.contentIcon = options.icon || '';
    this.code = options.code;
    this.type = options.type;
    this.children = options.children || [];
    this.actions = options.actions || [];
    this.options = options;
    this.position = options.position || '';
  }

  render() {
    this.$el = jQuery(this.html);
    this.$elWrapper = jQuery(this.htmlWrapper);
    this.$elWrapper.append(this.$el);
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
    this.$elWrapper.appendTo(selector);
    this.onViewed();
    return this;
  }

  getData() {
    return {
      type: this.type,
      code: this.code,
      icon: this.contentIcon,
      action: this.actions,
      children: this.getDataChild(),
    };
  }

  getDataChild() {
    return this.children.map((c) => {
      console.log(c);
      return {};
    });
  }

  onViewed(value?: any) {}
}
