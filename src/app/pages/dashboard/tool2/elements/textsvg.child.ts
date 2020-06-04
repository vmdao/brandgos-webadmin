import * as jQuery from 'jquery';
import { TypeBehavior } from './interfaces/type.interface';
import { TypeNothingBehavior } from './behaviors/type-nothing.behavior';
import { BaseElement } from './base.abstract';
import { SVG } from '@svgdotjs/svg.js';
import { load, Path } from 'opentype.js';
import { Text2Svg } from '../utils/text2svg.js';
export class TextSvgChild {
  $dom: any;
  fontsize: number;
  curve: number;
  letterSpacing: number;
  lightHeight: number;
  textAlign: string;
  uppercase: string;
  fontFamily: string;
  color: string;
  html: string;
  parent: BaseElement;
  typeBehavior: TypeBehavior;

  constructor(options: any, parent) {
    this.parent = parent;
    this.curve = options.style.curve;
    this.fontsize = options.style.fontsize;
    this.fontFamily = options.style.fontFamily;
    this.letterSpacing = options.style.letterSpacing;
    this.lightHeight = options.style.lightHeight;
    this.textAlign = options.style.textAlign;
    this.uppercase = options.uppercase;

    this.color = options.style.color;
    this.html = options.html;

    this.$dom = jQuery(`<div></div>`);
    this.$dom.addClass('element-inner');

    this.setTypeBehavior(new TypeNothingBehavior(this.parent));
    this.getStringSvg(options);
    this.elementAppendTo(parent.$dom);
  }

  elementAppendTo(parent) {
    this.$dom.appendTo(parent);
  }

  elementRemove() {
    this.$dom.remove();
  }

  elementEmpty() {
    this.$dom.empty();
  }

  setTypeBehavior(typeBehavior: TypeBehavior) {
    this.typeBehavior = typeBehavior;
  }

  performFontsize(fontsize: number) {
    this.typeBehavior.changeFontsize(fontsize);
  }

  performLineHeight(value: number) {
    this.typeBehavior.changeLineHeight(value);
  }

  performTextAlign(value: string) {
    this.typeBehavior.changeTextAlign(value);
  }

  performColor(value: string) {
    this.typeBehavior.changeColor(value);
  }

  performLetterSpacing(value: number) {
    this.typeBehavior.changeLetterSpacing(value);
  }

  performFontFamily(value: string) {
    this.typeBehavior.changeFontfamily(value);
  }

  performCurve(value: number) {
    this.typeBehavior.changeCurve(value);
  }

  performContent(value: string) {
    this.typeBehavior.changeContent(value);
  }

  getStringSvg(element) {
    const options = {
      fontSize: element.style.fontSize,
      color: element.style.color,
      fontFamily: element.style.fontFamily,
    };

    const style = element.style;

    const fonts = [
      '/assets/UV-Akashi.ttf',
      '/assets/cantata-one-regular.otf',
      '/assets/Roboto-Thin.ttf',
      '/assets/UV-Agin.ttf',
    ];

    Text2Svg.load(style.url, (text2svg) => {
      const path = text2svg.toPath(element.html, options);
      const width = path.width;
      const height = path.height;
      var draw = SVG().size('100%', '100%').viewbox(0, 0, width, height);

      draw.path(path.pathData);
      draw.fill(options.color);
      element.width = width;
      element.height = height;
      this.createDomSvg(draw.svg());
    });
  }

  createDomSvg = function (data) {
    this.$dom.empty();
    jQuery(data).appendTo(this.$dom);
    this.$dom.css({ width: this.width });
    this.$dom.css({ height: this.height });
  };
}
