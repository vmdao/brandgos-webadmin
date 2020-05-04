import { BaseElement } from './base.abstract';
import { TextChild } from './text.child';
import { TypeSvgBehavior } from './behaviors/type-svg.behavior';
export class TextSvgElement extends BaseElement {
  constructor(options: any) {
    super(options);
    this.setText(new TextChild(options.styles, this));
    if (this.elementType === 'textsvg') {
      this.text.setTypeBehavior(new TypeSvgBehavior(this));
    }
  }
}
