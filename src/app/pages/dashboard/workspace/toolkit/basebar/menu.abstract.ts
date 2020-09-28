import * as jQuery from 'jquery';
import { BaseElement } from '../../elements/abstracts/base.abstract';
import { BaseMenuItemUI } from './ui.asbtract';

export abstract class BaseMenu {
  options: {
    where?: string;
    type?: string;
    dataElement: BaseElement;
  };

  items: Array<BaseMenuItemUI> = [];
  where: string;
  type: string;

  html = '';
  $el: any;
  htmlWrapper = '';
  $elWrapper: any;

  isActived = false;
  isRendered = false;

  constructor(options: {
    where?: string;
    type?: string;
    dataElement: BaseElement;
  }) {
    this.options = options;
    if (options.where) {
      this.where = options.where;
    }

    if (options.type) {
      this.type = options.type;
    }
  }

  register(item) {
    this.items.push(item);
    this.renderItem(item);
  }

  renderItem(item) {
    item.appendTo(this.$el);
  }

  render() {
    if (!this.isRendered) {
      this.$el = jQuery(this.html);
      this.$elWrapper = jQuery(this.htmlWrapper);
      this.$elWrapper.append(this.$el);
      this.isRendered = true;
    }
  }

  reRender() {
    this.$el = jQuery(this.html);
    this.$elWrapper = jQuery(this.htmlWrapper);
    this.$elWrapper.append(this.$el);
    this.isRendered = true;
  }

  appendTo(selector) {
    if (!this.isActived) {
      this.$elWrapper.appendTo(selector);
      this.isActived = true;
    }
  }

  detach() {
    if (this.isActived) {
      this.$elWrapper.detach();
      this.isActived = false;
    }
  }

  getData() {
    return this.items.map((item: BaseMenuItemUI) => {
      const dataItem = item.getData();
      return dataItem;
    });
  }
}
