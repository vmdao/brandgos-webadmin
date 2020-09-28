import { BaseElement } from './abstracts/base.abstract';
import { TextSvgChild } from './textsvg.child';
import { TypeSvgBehavior } from './behaviors/type-svg.behavior';

import { MoveSingleBehavior } from './behaviors/move-single.behavior';
export class TextSvgElement extends BaseElement {
  html: string;
  constructor(options: any) {
    super(options);
    this.html = options.html || '';
    this.setText(new TextSvgChild(options, this));
    this.text.setTypeBehavior(new TypeSvgBehavior(this));
    this.setMoveBehavior(new MoveSingleBehavior(this));
  }

  getData() {
    const style = this.text.getData();
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
      html: this.html,
      style,
    };
  }
}
