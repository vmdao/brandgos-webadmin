import * as jQuery from 'jquery';
import { BaseElement } from './base.abstract';

export abstract class BaseSvgChild {
  $dom: any;
  strokeWidth: number;
  strokeColor: string;
  color1: string;
  color2: string;
  color3: string;
  parent: BaseElement;

  constructor(options: any, parent) {
    this.parent = parent;

    this.color1 = options.style.color1;
    this.color2 = options.style.color2;
    this.color3 = options.style.color3;

    this.$dom = jQuery(`<div class="element-inner"></div>`);
  }

  render() {}

  elementAppendTo(parent) {
    this.$dom.appendTo(parent);
  }

  performStrokeWidth(value) {
    this.$dom.find('.color-1').css({ borderWidth: value });
    this.strokeWidth = value;
  }

  performStrokeColor(color) {
    this.$dom.find('.color-1').css({ borderColor: color });
    this.strokeColor = color;
  }

  performColor1(color) {
    this.$dom.find('.color-1').css({ fill: color, backgroundColor: color });
    this.color1 = color;
  }

  performColor2(color) {
    this.$dom.find('.color-2').css({ fill: color, backgroundColor: color });
    this.color2 = color;
  }

  performColor3(color) {
    this.$dom.find('.color-3').css({ fill: color, backgroundColor: color });
    this.color3 = color;
  }

  setColorName() {
    let elementFill = this.$dom.find('[fill]');
    if (elementFill.length === 0) {
      elementFill = this.$dom.find('svg > path');
    }
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
  }

  updateSvg() {}

  getData() {
    return {
      color1: this.color1,
      color2: this.color2,
      color3: this.color3,
      strokeWidth: this.strokeWidth,
      strokeColor: this.strokeColor,
    };
  }
}
