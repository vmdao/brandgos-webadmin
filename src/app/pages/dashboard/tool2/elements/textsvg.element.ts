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
}
