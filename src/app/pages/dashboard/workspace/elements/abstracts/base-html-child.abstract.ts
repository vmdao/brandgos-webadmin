import * as jQuery from 'jquery';
import { Html } from '../interfaces/has-html.interface';
import { Color } from './color';

export abstract class BaseHtmlChild {
  $el: any;
  parent: Html;

  constructor(parent: Html) {
    this.parent = parent;
    this.$el = jQuery(`<div class="element-inner"></div>`);
  }

  render() {}

  appendTo(parent) {
    this.$el.appendTo(parent);
  }

  performStrokeWidth(value) {
    this.$el.find('.color-1').css({ borderWidth: value });
    this.parent.strokeWidth = value;
  }

  performStrokeColor(color) {
    this.$el.find('.color-1').css({ borderColor: color });
    this.parent.strokeColor = color;
  }

  performColor(value: Color) {
    this.parent.colors = this.parent.colors.map((color) => {
      if (color.order === value.order) {
        color.color = value.color;
        this.$el
          .find(`.color-${value.order}`)
          .css({ fill: color, backgroundColor: value.color });
      }

      return color;
    });
  }

  setColorName() {
    let elementFill = this.$el.find('[fill]');
    if (elementFill.length === 0) {
      elementFill = this.$el.find('svg > path');
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
}
