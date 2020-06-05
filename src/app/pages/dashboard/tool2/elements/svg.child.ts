import * as jQuery from 'jquery';
import * as loadsvg from 'load-svg';
import { BaseElement } from './base.abstract';
export class SvgChild {
  $dom: any;

  color1: string;
  color2: string;
  color3: string;

  width: number;
  height: number;

  mediaId: string;
  mediaCode: string;

  originUrl: string;
  originThumb: string;
  parent: BaseElement;
  constructor(options: any, parent) {
    this.parent = parent;
    this.color1 = options.style.color1;
    this.color2 = options.style.color2;
    this.color3 = options.style.color3;
    this.originUrl = options.style.originUrl;
    this.originThumb = options.style.originThumb;
    this.$dom = jQuery(`<div class="element-inner"></div>`);
    this.render();
  }

  render() {
    loadsvg(this.originUrl, (err, htmlSvg) => {
      this.$dom.html(htmlSvg);
      this.elementAppendTo(this.parent.$dom);
    });
  }

  elementAppendTo(parent) {
    this.$dom.appendTo(parent);
  }

  getData() {
    return {
      color1: this.color1,
      color2: this.color2,
      color3: this.color3,
      originUrl: this.originUrl,
      originThumb: this.originThumb,
    };
  }
}
