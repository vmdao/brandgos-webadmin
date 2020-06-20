import { TypeBehavior } from '../interfaces/type.interface';
import { BaseElement } from '../base.abstract';
import * as jQuery from 'jquery';

import { SVG } from '@svgdotjs/svg.js';
import { Text2Svg } from '../../utils/text2svg.js';
import { BaseTextChild } from '../base-text-child.abstract';

import * as makerjs from 'makerjs';
import { paths, exporter } from 'makerjs';

const { Circle } = paths;
export class TypeSvgBehavior implements TypeBehavior {
  element: BaseElement;
  text: BaseTextChild;
  $dom;

  constructor(element: BaseElement) {
    this.element = element;
    this.text = element.text;
    this.$dom = this.text.$dom;
    this.render();
  }

  changeFontSize(value: any) {
    this.getHtmlSvg(value);
  }
  changeLineHeight(value: number) {}
  changeTextAlign(value: string) {}
  changeColor(value: string) {
    this.$dom.find('[fill]').css('fill', value);
  }
  changeLetterSpacing(value: any) {}
  changeFontfamily(value: any) {
    this.getHtmlSvg(value);
  }
  changeCurve(value: any) {}
  changeContent(value: any) {}
  changeTextTransform(value: any) {
    this.getHtmlSvg(value);
  }

  render() {
    this.getHtmlSvg();
  }

  getHtmlSvg(value?: any) {
    const data = this.text.getData();
    // tslint:disable-next-line: no-string-literal
    Text2Svg.load(data['url'], (text2svg) => {
      // tslint:disable-next-line: no-string-literal
      const path = text2svg.toPath(data['htmlSvg'], data);
      const width = path.width;
      const height = path.height;
      const draw = SVG().size(width, height).viewbox(0, 0, width, height);

      draw.path(path.pathData);
      draw.fill(data.color);
      this.element.updateSizeByFontsize({ width, height });
      this.renderSvgDom(draw.svg());
      if (value && typeof value.callback === 'function') {
        value.callback();
      }
    });
  }

  renderSvgDom(svgHtml) {
    this.$dom.empty();
    this.$dom.append(svgHtml);
    this.$dom.css({ width: this.element.width, height: this.element.height });
  }
}
