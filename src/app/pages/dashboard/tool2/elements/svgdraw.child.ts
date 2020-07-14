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
    const { width, height } = this.parent;
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
        shapeModel = new models.RoundRectangle(width, height, this.radius);
        break;
      case 'rect':
        shapeModel = new models.RoundRectangle(width, height, this.radius);
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

    console.log(fill, 1234);

    const options: { fill?: string; stroke?: string; strokeWidth?: string } = {
      stroke: this.stroke,
      strokeWidth: `${this.strokeWidth}px`,
    };

    if (fill) {
      options.fill = fill;
    }

    const svgPath = exporter
      .toSVG(shapeModel, options)
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
