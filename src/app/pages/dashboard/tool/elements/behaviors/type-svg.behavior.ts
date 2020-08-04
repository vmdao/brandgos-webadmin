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
    // tslint:disable-next-line: no-string-literal
    const htmlSvg = data['htmlSvg'];
    // tslint:disable-next-line: no-string-literal
    const fill = data['color'];
    const curve = -360;
    // tslint:disable-next-line: no-string-literal
    const fontSize = data['fontSize'];
    const optionsText = {
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
        optionsText
      );
      let size = measure.modelExtents(textModel);

      if (curve > 0 && htmlSvg.length > 1) {
        const radius = (size.width * 180) / curve / Math.PI;
        const arc = new Arc([0, 0], radius, 270 - curve / 2, 270 + curve / 2);
        layout.childrenOnPath(textModel, arc, 0, false, true, true);
        size = measure.modelExtents(textModel);
      } else if (curve < 0 && htmlSvg.length > 1) {
        const _curve = Math.abs(curve);
        const radius = (size.width * 180) / _curve / Math.PI;
        const arc = new Arc([0, 0], radius, 90 - _curve / 2, 90 + _curve / 2);
        layout.childrenOnPath(textModel, arc, 0, false, true, true);
        size = measure.modelExtents(textModel);
      }

      const optionsExport: {
        svgAttrs?: any;
        fill?: string;
        stroke?: string;
        strokeWidth?: string;
        accuracy?: number;
        annotate?: boolean;
        viewBox?: boolean;
        scalingStroke?: boolean;
        useSvgPathOnly?: boolean;
        fontSize: string;
      } = {
        svgAttrs: {
          width: '100%',
          height: '100%',
        },
        fontSize: '12px',
        useSvgPathOnly: true,
        strokeWidth: `${0}px`,
        accuracy: 0.0001,
        annotate: false,
        viewBox: true,
        scalingStroke: true,
      };
      if (fill) {
        optionsExport.fill = fill;
      }

      const svgHtml = exporter.toSVG(textModel, optionsExport);
      this.renderSvgDom(svgHtml);
      this.element.updateSizeByFontsize({
        width: size.width,
        height: size.height,
      });
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
function fixViewBoxWithsStrokeWidth(svgHtml, width, height, strokeWidth) {
  return `<svg viewBox="${(strokeWidth / 2) * -1} ${
    (strokeWidth / 2) * -1
  } ${width} ${height}">${svgHtml}</svg>`;
}
