import { BaseElement } from './base.abstract';
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
      elementType: this.elementType,
      elementIndex: this.order,
      transparency: this.transparent,
      rotation: this.angle,
      width: this.width,
      height: this.height,
      top: this.top,
      left: this.left,
      scale: this.scale,
      html: this.html,
      style,
    };
  }
}
