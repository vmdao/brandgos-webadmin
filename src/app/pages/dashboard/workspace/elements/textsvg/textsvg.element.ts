import { BaseElement } from '../abstracts/base.abstract';
import { TextSvgChild } from './textsvg.child';
import { TypeSvgBehavior } from '../behaviors/type-svg.behavior';

import { Text } from '../interfaces/has-text.interface';
export class TextSvgElement extends BaseElement implements Text {
  url: string;
  color: string;
  curve: number;
  content: string;
  lineHeight: number;
  textAlign: string;
  fontFamily: string;
  transform: string;
  fontSize: number;
  letterSpacing: number;
  typeBehavior: TypeSvgBehavior;

  text: TextSvgChild;

  constructor(options: any) {
    super(options);
    this.url = '/assets/Roboto-Medium.ttf';
    this.curve = options.curve || 0;

    this.content = options.content || 'Brandgos';
    this.color = options.color || '#000';
    this.lineHeight = options.lineHeight || 1;
    this.textAlign = options.textAlign || 'left';
    this.fontFamily = options.fontFamily || '';
    this.transform = options.transform;
    this.fontSize = options.fontSize || 16;
    this.letterSpacing = 1;

    this.setText(new TextSvgChild(this));
    this.text.setTypeBehavior(new TypeSvgBehavior(this));
  }

  setText(text: TextSvgChild) {
    this.text = text;
  }

  renderElement(child) {
    this.$el.append(child.$el);
    console.log('text renderElement');
  }

  render() {
    this.text.appendTo(this.$el);
  }

  getData() {
    const baseData = super.getData();
    return {
      ...baseData,
      color: this.color,
      curve: this.curve,
      letterSpacing: this.letterSpacing,
      lineHeight: this.lineHeight,
      textAlign: this.textAlign,
      fontFamily: this.fontFamily,
      transform: this.transform,
      fontSize: this.fontSize,
      content: this.content,
      url: this.url,
    };
  }
}
