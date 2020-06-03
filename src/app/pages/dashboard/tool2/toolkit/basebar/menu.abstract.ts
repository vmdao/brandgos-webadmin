import * as jQuery from 'jquery';
import { BaseElement } from '../../elements/base.abstract';

export abstract class BaseMenu {
  options: {
    where?: string;
    type?: string;
    dataElement: BaseElement;
  };
  $dom: any;
  items: Array<any> = [];
  where: string;
  type: string;
  htmlWrapper = '';

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
    this.$dom.append(item.$dom);
  }

  render(selector?: any) {
    this.$dom = jQuery(this.htmlWrapper);
    if (selector) {
      this.$dom.appendTo(selector);
    }
  }
}
