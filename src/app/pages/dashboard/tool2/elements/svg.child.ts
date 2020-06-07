import * as jQuery from 'jquery';
import * as loadsvg from 'load-svg';
import { BaseElement } from './base.abstract';
import { $ } from 'protractor';
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
      this.setColorName();
    });
  }

  elementAppendTo(parent) {
    this.$dom.appendTo(parent);
  }

  performColor1(color) {
    this.$dom.find('.color-1').css('fill', color);
    this.color1 = color;
  }

  performColor2(color) {
    this.$dom.find('.color-2').css('fill', color);
    this.color2 = color;
  }

  performColor3(color) {
    this.$dom.find('.color-3').css('fill', color);
    this.color3 = color;
  }

  setColorName() {
    const elementFill = this.$dom.find('[fill]');
    const colors = {};

    if (elementFill.length > 0) {
      elementFill.each((i, e) => {
        const color = jQuery(e).attr('fill');
        if (!colors[color]) {
          colors[color] = [];
        }
        colors[color].push(e);
      });
    }
    let colorCouter = 1;
    Object.keys(colors).forEach((color, index) => {
      colors[color].map((e) => {
        jQuery(e).addClass('color-' + colorCouter);
      });
      colorCouter++;
    });
    console.log(colors);
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
