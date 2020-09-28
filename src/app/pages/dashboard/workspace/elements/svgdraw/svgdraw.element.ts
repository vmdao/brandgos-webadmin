import { BaseElement } from '../abstracts/base.abstract';
import { SvgDrawChild } from './svgdraw.child';
export class SvgDrawElement extends BaseElement {
  background = 0;
  constructor(options: any) {
    super(options);

    this.background = options.background || 0;

    this.borderRadius = options.style.borderRadius || 0;
    this.strokeWidth = options.style.strokeWidth || 0;
    this.setSvg(new SvgDrawChild(options, this));
    this.$dom.css('border-radius', this.borderRadius);
  }

  updateSvg() {
    this.svg.updateSvg();
  }

  getData() {
    const style = this.svg.getData();
    return {
      elementId: this.elementId,
      elementType: this.elementType,

      top: this.top,
      left: this.left,

      width: this.width,
      height: this.height,

      angle: this.angle,
      transparent: this.transparent,

      scale: this.scale,
      order: this.order,
      style,
    };
  }

  setBorderRadius(borderRadius) {
    this.borderRadius = borderRadius;
  }
}
