import { BaseTextChild } from '../abstracts/base-text-child.abstract';
import { TextSvgElement } from './textsvg.element';
export class TextSvgChild extends BaseTextChild {
  url = '';
  htmlSvg = '';

  parent: TextSvgElement;

  constructor(parent) {
    super(parent);
    this.htmlSvg = this.getHtmlTransform();
  }

  render() {
    this.parent.renderElement(this);
  }

  performCurve(value: any) {
    this.parent.typeBehavior.changeCurve(value);
  }

  performLetterSpacing(value: any) {
    this.parent.typeBehavior.changeLetterSpacing(value);
  }

  perforTextTransform(value: any) {
    this.htmlSvg = this.getHtmlTransform();
    this.parent.transform = value.value;
    this.parent.typeBehavior.changeTextTransform(value);
  }

  performContent(value: any) {
    this.htmlSvg = this.getHtmlTransform();
    this.parent.typeBehavior.changeTextTransform(value);
  }

  performFontFamily(value: any) {
    this.parent.typeBehavior.changeFontfamily(value);
  }

  performFontsize(value: any) {
    this.parent.typeBehavior.changeFontfamily(value);
  }

  performColor(value: string) {
    this.parent.typeBehavior.changeColor(value);
  }

  getHtmlTransform() {
    return this.parent.transform === 'uppercase'
      ? this.parent.content.toUpperCase()
      : this.parent.content;
  }
}
