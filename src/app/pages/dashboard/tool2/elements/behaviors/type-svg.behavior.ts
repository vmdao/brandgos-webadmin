import { TypeBehavior } from '../interfaces/type.interface';
import { BaseElement } from '../base.abstract';
import * as jQuery from 'jquery';

import { SVG } from '@svgdotjs/svg.js';
import { Text2Svg } from '../../utils/text2svg.js';
export class TypeSvgBehavior implements TypeBehavior {
  element: BaseElement;
  constructor(element: BaseElement) {
    this.element = element;
    console.log('TypeSvgBehavior');
  }
  changeFontSize(value: number) {}
  changeLineHeight(value: number) {}
  changeTextAlign(value: string) {}
  changeColor(value: string) {}
  changeLetterSpacing(value: number) {}
  changeFontfamily(value: string) {}
  changeCurve(value: number) {}
  changeContent(value: string) {}
  changeTextTransform(value: string) {
    this.element.text.perforTextTransform(value);
  }

  render() {
    console.log(this.element, 'TypeSvgBehavior render');
    this.getSvgHtml(this.element);
  }

  getSvgHtml(parent) {
    const fonts = [
      '/assets/UV-Akashi.ttf',
      '/assets/cantata-one-regular.otf',
      '/assets/Roboto-Thin.ttf',
      '/assets/UV-Agin.ttf',
    ];
    const data = this.element.text.getData();
    Text2Svg.load(data.url, (text2svg) => {
      const path = text2svg.toPath(parent.html, data);
      const width = path.width;
      const height = path.height;

      const draw = SVG().size('100%', '100%').viewbox(0, 0, width, height);

      draw.path(path.pathData);
      draw.fill(data.color);

      parent.setWidth(width);
      parent.setHeight(height);

      this.renderSvgDom(draw.svg());
    });
  }

  renderSvgDom = function (svgHtml) {
    this.$dom.empty();
    this.$dom.css({ width: this.width, height: this.height });
    this.$dom.append(svgHtml);
  };
}
