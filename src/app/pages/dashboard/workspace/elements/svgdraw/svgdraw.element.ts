import { BaseSvgChild } from '../abstracts/base-svg-child.abstract';
import { BaseElement } from '../abstracts/base.abstract';
import { Color } from '../abstracts/color';
import { Svg } from '../interfaces/has-svg.interface';
import { SvgDrawChild } from './svgdraw.child';
export class SvgDrawElement extends BaseElement implements Svg {
  background = 0;

  colors: Array<Color> = [];
  strokeWidth: number;
  strokeColor: string;
  borderRadius: number;

  svg: BaseSvgChild;
  shape: string;

  constructor(options: any) {
    super(options);
    this.background = options.background || 0;
    this.setSvg(new SvgDrawChild(this));
    this.$el.css('border-radius', this.borderRadius);
  }

  renderElement(child) {
    this.$el.append(child.$el);
  }

  setSvg(svg: BaseSvgChild) {
    this.svg = svg;
  }

  updateSvg() {
    this.svg.updateSvg();
  }

  getData() {
    const baseData = super.getData();
    return {
      ...baseData,
      colors: this.colors,
      strokeWidth: this.strokeWidth,
      strokeColor: this.strokeColor,
      borderRadius: this.borderRadius,
      shape: this.shape,
    };
  }

  setBorderRadius(borderRadius) {
    this.borderRadius = borderRadius;
  }
}
