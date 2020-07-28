import { BaseElement } from './base.abstract';
import { SvgChild } from './svg.child';
export class SvgElement extends BaseElement {
  background: false;
  constructor(options: any) {
    super(options);
    this.background = options.background || false;
    this.setSvg(new SvgChild(options, this));
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
}
