import { BaseElement } from './base.abstract';
import { SvgDrawChild } from './svgdraw.child';
export class SvgDrawElement extends BaseElement {
  background: false;
  borderRadius = 0;
  constructor(options: any) {
    super(options);

    this.background = options.background || false;
    this.borderRadius = options.style.borderRadius || 0;
    this.setSvg(new SvgDrawChild(options, this));
    this.$dom.css('border-radius', this.borderRadius);
  }

  updateSvg() {
    this.svg.updateSvg();
  }

  getData() {
    const style = this.svg.getData();
    return {
      elementType: this.elementType,
      elementIndex: this.order,
      transparent: this.transparent,
      rotation: this.angle,
      width: this.width,
      height: this.height,
      top: this.top,
      left: this.left,
      scale: this.scale,
      style,
    };
  }

  setBorderRadius(borderRadius) {
    this.borderRadius = borderRadius;
  }
}
