import { BaseElement } from '../abstracts/base.abstract';
import { TextSvgChild } from './textsvg.child';
import { TypeSvgBehavior } from '../behaviors/type-svg.behavior';

import { Text } from '../interfaces/has-text.interface';
import { TextSvgDTO } from './TextSvgDTO';
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

  text: TextSvgChild;

  constructor(params: TextSvgDTO) {
    super(params);

    this.url = '/assets/Roboto-Medium.ttf';
    this.curve = params.curve || 0;

    this.content = params.content || 'Brandgos';
    this.color = params.color || '#000';
    this.lineHeight = params.lineHeight || 1;
    this.textAlign = params.textAlign || 'left';
    this.fontFamily = params.fontFamily || '';
    this.transform = params.transform;
    this.fontSize = params.fontSize || 16;
    this.letterSpacing = 1;

    this.setText(new TextSvgChild(this));
    this.text.setTypeBehavior(new TypeSvgBehavior(this));
    this.render();
  }

  render() {
    console.log('this.typeBehavior', this.text);
    this.text.getHtmlSvg();
    // this.text.typeBehavior.getHtmlSvg().then((data) => {
    //   console.log('data', data);
    //   // this.renderElement(data.child);
    // });
  }

  setText(text: TextSvgChild) {
    this.text = text;
  }

  renderElement(child) {
    this.$el.append(child.$el);
    console.log('text renderElement');
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
