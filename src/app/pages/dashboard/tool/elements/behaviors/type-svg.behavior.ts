import { TypeBehavior } from '../interfaces/type.interface';
import { BaseElement } from '../base.abstract';

import { SVG } from '@svgdotjs/svg.js';
import { Text2Svg } from '../../utils/text2svg.js';
import { BaseTextChild } from '../base-text-child.abstract';

import { paths, exporter, models, layout, measure } from 'makerjs';
import { RenderOptions } from 'opentype.js';
const { Arc } = paths;

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
    const urlFont = data['url'];
    const htmlSvg = data['htmlSvg'];
    const curve = 60
    ;
    const fontSize = data['fontSize'];
    const options = {
      // tracking: curve > 0 || curve < 0 ? fontSize * -3 : 0,
      letterSpacing: 0,
    } as RenderOptions;

    Text2Svg.load(urlFont, (text2svg) => {
      const textModel = new models.Text(
        text2svg.font,
        htmlSvg,
        fontSize,
        false,
        true,
        0,
        options
      );
      // r = (S * 180) / Math.PI * 359

      if (curve > 0) {
        const size = measure.modelExtents(textModel);
        const radius = (size.width * 180) / curve / Math.PI;
        console.log('radius', radius);

        const arc = new Arc(
          [0, 0],
          radius - fontSize,
          270 - curve / 2,
          270 + curve / 2
        );
        layout.childrenOnPath(textModel, arc);
      } else if (curve < 0) {
        const _curve = Math.abs(curve);
        const size = measure.modelExtents(textModel);
        const arc = new Arc(
          [0, 0],
          size.width / Math.tan(Math.PI / (180 / _curve)),
          90 - _curve / 2,
          90 + _curve / 2
        );
        layout.childrenOnPath(textModel, arc, 0, true);
      }

      const size = measure.modelExtents(textModel);

      const path = text2svg.toPath(htmlSvg, data);
      const width = size.width;
      const height = size.height;

      const draw = SVG().viewbox(0, 0, width, height);
      draw.path(path.pathData);
      draw.fill(data.color);

      // const svgString = draw.svg();
      const svgString = exporter.toSVG(textModel, {
        fill: '#000',
        useSvgPathOnly: false,
        fontSize: '12px',
      });
      this.renderSvgDom(svgString);

      this.element.updateSizeByFontsize({ width, height });

      if (value && typeof value.callback === 'function') {
        value.callback();
      }
    });
  }

  renderSvgDom(svgHtml) {
    this.$dom.empty();
    this.$dom.append(svgHtml);
    this.$dom.css({ width: '100%', height: '100%' });
  }
}
