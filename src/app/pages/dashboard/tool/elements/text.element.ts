import { BaseElement } from './base.abstract';
import { TextChild } from './text.child';
import { TypeTextBehavior } from './behaviors/type-text.behavior';
export class TextElement extends BaseElement {
  constructor(options: any) {
    super(options);
    this.setText(new TextChild(options.styles, this));
    this.text.setTypeBehavior(new TypeTextBehavior(this));
  }
}
