import { BaseTextChild } from './base-text-child.abstract';

export class TextSvgChild extends BaseTextChild {
  url = '';
  htmlSvg = '';
  constructor(options: any, parent) {
    super(options, parent);
    this.url = options.style.url;
    this.htmlSvg = this.getHtmlTransform();
  }

  render() {
    this.elementAppendTo(this.parent.$dom);
  }

  perforTextTransform(value: any) {
    this.transform = value.value;
    this.htmlSvg = this.getHtmlTransform();
    this.typeBehavior.changeTextTransform(value);
  }

  performFontFamily(value: any) {
    this.url = value.url;
    this.fontFamily = value.label;
    this.typeBehavior.changeFontfamily(value);
  }

  performFontsize(value: any) {
    this.fontSize = value.value;
    this.typeBehavior.changeFontfamily(value);
  }

  performColor(value: string) {
    this.color = value;
    this.typeBehavior.changeColor(value);
  }

  getHtmlTransform() {
    return this.transform === 'uppercase' ? this.html.toUpperCase() : this.html;
  }

  getData() {
    return {
      curve: this.curve,
      fontSize: this.fontSize,
      lineHeight: this.lightHeight,
      letterSpacing: this.letterSpacing,
      fontFamily: this.fontFamily,
      textAlign: this.textAlign,
      color: this.color,
      transform: this.transform,
      html: this.html,
      url: this.url,
      htmlSvg: this.htmlSvg,
    };
  }
}
