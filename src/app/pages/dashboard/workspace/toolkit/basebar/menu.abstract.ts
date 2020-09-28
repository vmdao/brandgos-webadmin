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
  $dom: any;
  htmlWrapper = '';
  $domWrapper: any;

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
    item.appendTo(this.$dom);
  }

  render() {
    if (!this.isRendered) {
      this.$dom = jQuery(this.html);
      this.$domWrapper = jQuery(this.htmlWrapper);
      this.$domWrapper.append(this.$dom);
      this.isRendered = true;
    }
  }

  reRender() {
    this.$dom = jQuery(this.html);
    this.$domWrapper = jQuery(this.htmlWrapper);
    this.$domWrapper.append(this.$dom);
    this.isRendered = true;
  }

  appendTo(selector) {
    if (!this.isActived) {
      this.$domWrapper.appendTo(selector);
      this.isActived = true;
    }
  }

  detach() {
    if (this.isActived) {
      this.$domWrapper.detach();
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
