import { models, exporter } from 'makerjs';
import { BaseSvgChild } from './base-svg-child.abstract';

export class SvgDrawChild extends BaseSvgChild {
  shape: string;
  stroke: string;
  strokeWidth: number;
  borderRadius: number;

  constructor(options: any, parent) {
    super(options, parent);
    this.shape = options.style.shape;
    this.stroke = options.style.stroke;
    this.strokeWidth = options.style.strokeWidth;
    this.borderRadius = options.style.borderRadius;
    this.render();
  }

  render() {
    this.updateSvg();
    this.elementAppendTo(this.parent.$dom);
  }

  updateSvg() {
    let shapeModel;
    const { width, height, borderRadius } = this.parent;
    const strokeWidth = (this.strokeWidth || 0) * 2;
    switch (this.shape) {
      case 'triangle':
        const haftWidth = width / 2;
        const haftHeight = height / 2;
        shapeModel = new models.ConnectTheDots(true, [
          [haftWidth * -1, haftHeight * -1],
          [haftWidth, haftHeight * -1],
          [0, haftHeight],
        ]);
        break;
      case 'line':
        shapeModel = new models.RoundRectangle(width, height, borderRadius);
        break;
      case 'rect':
        shapeModel = new models.RoundRectangle(width, height, borderRadius);
        break;
      case 'circle':
        if (width === height) {
          shapeModel = new models.Oval(width, height);
        } else {
          shapeModel = new models.Ellipse(width, height);
        }
        break;
    }

    const fill =
      typeof this.color1 === 'string' && this.color1 !== ''
        ? this.color1
        : null;

    const options: {
      svgAttrs?: any;
      fill?: string;
      stroke?: string;
      strokeWidth?: string;
      accuracy?: number;
      annotate?: boolean;
      viewBox?: boolean;
      scalingStroke?: boolean;
    } = {
      svgAttrs: {
        width: '100%',
        height: '100%',
      },
      stroke: this.stroke,
      strokeWidth: `${this.strokeWidth}px`,
      accuracy: 0.001,
      annotate: false,
      viewBox: true,
      scalingStroke: true,
    };

    if (fill) {
      options.fill = fill;
    }

    const svgPath = exporter.toSVG(shapeModel, { ...options, units: 'px' });

    this.$dom.html(svgPath);
    this.setColorName();
  }

  getData() {
    return {
      color1: this.color1,
      color2: this.color2,
      color3: this.color3,
    };
  }
}
