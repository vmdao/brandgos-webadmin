import { BaseElement } from './base.abstract';
import { SvgChild } from './svg.child';
export class SvgElement extends BaseElement {
  constructor(options: any) {
    super(options);
    this.setSvg(new SvgChild(options.styles));
  }
}
