import { BaseElement } from './base.abstract';
import { TextSvgChild } from './textsvg.child';
import { TypeSvgBehavior } from './behaviors/type-svg.behavior';

import { MoveSingleBehavior } from './behaviors/move-single.behavior';
export class TextSvgElement extends BaseElement {
  constructor(options: any) {
    super(options);
    this.setText(new TextSvgChild(options, this));
    this.text.setTypeBehavior(new TypeSvgBehavior(this));
    this.setMoveBehavior(new MoveSingleBehavior(this));
  }

  getData() {
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
      style: {
        curve: this.text.curve,
        fontSize: this.text.fontsize,
        lineHeight: this.text.fontsize,
        fontFamily: this.text.fontFamily,
        textAlign: this.text.textAlign,
        color: this.text.color,
        uppercase: this.text.uppercase,
        url: '/assets/UV-Agin.ttf',
      },
    };
  }
}
