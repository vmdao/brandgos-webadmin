import { BaseElement } from '../abstracts/base.abstract';
import { TextChild } from './text.child';
import { TypeTextBehavior } from '../behaviors/type-text.behavior';
import { Text } from '../interfaces/has-text.interface';
export class TextElement extends BaseElement implements Text {
  color: string;
  curve: number;
  letterSpacing: number;
  lineHeight: number;
  textAlign: string;
  fontFamily: string;
  transform: string;
  fontSize: number;
  content: string;
  typeBehavior: TypeTextBehavior;
  text: TextChild;

  constructor(options: any) {
    super(options);
    this.setText(new TextChild(this));
    this.text.setTypeBehavior(new TypeTextBehavior(this));
  }

  setText(text: TextChild) {
    this.text = text;
  }

  renderElement(child) {
    this.$el.append(child.$el);
  }

  getData() {
    const style = super.getData();
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
      content: this.content,
      style,
    };
  }
}
