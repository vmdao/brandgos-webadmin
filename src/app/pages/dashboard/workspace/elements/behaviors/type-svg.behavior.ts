import { TypeBehavior } from '../interfaces/type.interface';
import { Text2Svg } from '../../utils/text2svg.js';

import { paths, exporter, models, layout, measure } from 'makerjs';
import { RenderOptions } from 'opentype.js';
import { TextSvgElement } from '../textsvg/textsvg.element';

const { Arc } = paths;

export class TypeSvgBehavior implements TypeBehavior {
  element: TextSvgElement;

  constructor(element: TextSvgElement) {
    this.element = element;
  }

  public changeFontSize(value: any) {
    this.getHtmlSvg(value);
  }

  public changeLineHeight(value: number) {}

  public changeTextAlign(value: string) {}

  public changeColor(value: string) {
    this.element.$el.find('[fill]').css('fill', value);
  }

  public changeLetterSpacing(value: any) {
    this.getHtmlSvg(value);
  }

  public changeFontfamily(value: any) {
    this.getHtmlSvg(value);
  }

  public changeCurve(value: any) {
    this.getHtmlSvg(value);
  }

  public changeContent(value: any) {}

  public changeTextTransform(value: any) {
    this.getHtmlSvg(value);
  }

  public render(): Promise<any> {
    return this.getHtmlSvg();
  }

  getHtmlSvg(value?: any): Promise<any> {
    const data = this.element.getData();

    const {
      color: fill,
      curve,
      fontSize,
      letterSpacing,
      url: urlFont,
      content,
    } = data;

    const optionsText = {
      letterSpacing,
    } as RenderOptions;

    return new Promise((resolve, reject) => {
      return Text2Svg.load(urlFont, (text2svg) => {
        const textModel = new models.Text(
          text2svg.font,
          content,
          fontSize,
          false,
          true,
          0,
          optionsText
        );
        const htmlSvg = content;
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
          layout.childrenOnPath(textModel, arc, 0, true, true, true);
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
        return resolve({ status: 200, child: this });
        if (value && typeof value.callback === 'function') {
          value.callback();
        }
      });
    });
  }

  private renderSvgDom(svgHtml) {
    this.element.$el.empty();
    this.element.$el.append(svgHtml);
    this.element.$el.css({ width: '100%', height: '100%' });
  }
}
