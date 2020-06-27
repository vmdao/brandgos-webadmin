import * as jQuery from 'jquery';
import { models, exporter } from 'makerjs';
import { BaseSvgChild } from './base-svg-child.abstract';

export class SvgDrawChild extends BaseSvgChild {
  shape: string;
  stroke: string;
  strokeWidth: number;
  radius: number;

  constructor(options: any, parent) {
    super(options, parent);
    this.shape = options.style.shape;
    this.stroke = options.style.stroke;
    this.strokeWidth = options.style.strokeWidth;
    this.radius = options.style.radius;
    this.render();
  }

  render() {
    this.updateSvg();
    this.elementAppendTo(this.parent.$dom);
  }

  updateSvg() {
    let shapeModel;
    switch (this.shape) {
      case 'line':
        shapeModel = new models.RoundRectangle(
          this.parent.width,
          this.parent.height,
          this.radius
        );
        break;
      case 'rect':
        shapeModel = new models.RoundRectangle(
          this.parent.width,
          this.parent.height,
          this.radius
        );
        break;
      case 'circle':
        shapeModel = new models.Oval(this.parent.width, this.parent.height);
        break;
    }

    const svgPath = exporter
      .toSVG(shapeModel, {
        fill: '#000',
        stroke: this.stroke,
        strokeWidth: `${this.strokeWidth}px`,
      })
      .replace('width=', '')
      .replace('height=', '');

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
