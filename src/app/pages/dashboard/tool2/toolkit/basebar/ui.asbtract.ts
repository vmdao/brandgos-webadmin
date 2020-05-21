import * as jQuery from 'jquery';
export abstract class BaseMenuItemUI {
  html: string;
  name: string;
  id: string;
  options: { icon?: string; children?: Array<BaseMenuItemUI> };
  htmlWrapper: string;
  children: Array<{ BaseMenuItemUI }>;

  constructor(options: { icon?: string; children?: Array<BaseMenuItemUI> }) {
    this.options = options;
    this.children = this.children;
  }
  getHtml() {
    return this.html;
  }
}
