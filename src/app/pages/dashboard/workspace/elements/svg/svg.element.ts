import { BaseElement } from '../abstracts/base.abstract';
import { SvgChild } from './svg.child';
export class SvgElement extends BaseElement {
  background = 0;
  constructor(options: any) {
    super(options);
    this.background = options.background || 0;
    this.setSvg(new SvgChild(options, this));
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
}
