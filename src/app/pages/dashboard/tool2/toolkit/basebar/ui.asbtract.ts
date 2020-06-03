import * as jQuery from 'jquery';
export abstract class BaseMenuItemUI {
  code: string;
  html: string;
  name: string;
  options: { icon?: string; children?: Array<BaseMenuItemUI> };
  children: Array<{ BaseMenuItemUI }>;
  $dom;
  constructor(options: { icon?: string; children?: Array<BaseMenuItemUI> }) {
    this.options = options;
    this.children = this.children;
  }

  render() {
    this.$dom = jQuery(this.html);
  }

  getHtml() {
    return this.html;
  }
}
