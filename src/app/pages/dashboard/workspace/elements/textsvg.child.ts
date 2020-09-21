import { BaseTextChild } from './base-text-child.abstract';
export interface TextSvgChildData {
  curve: number;
  letterSpacing: number;
  lineHeight: number;
  textAlign: string;
  fontFamily: string;
  transform: string;
  fontSize: number;
  color: string;
  html: string;
  htmlSvg: string;
  url: string;
}
export class TextSvgChild extends BaseTextChild {
  url = '';
  htmlSvg = '';
  constructor(options: any, parent) {
    super(options, parent);
    if (options.style) {
      this.url = options.style.url;
    }
    this.htmlSvg = this.getHtmlTransform();
  }

  render() {
    this.elementAppendTo(this.parent.$dom);
  }

  performCurve(value: any) {
    this.curve = value.content;
    this.typeBehavior.changeCurve(value);
  }

  performLetterSpacing(value: any) {
    this.letterSpacing = value.content;
    this.typeBehavior.changeLetterSpacing(value);
  }

  perforTextTransform(value: any) {
    this.transform = value.value;
    this.htmlSvg = this.getHtmlTransform();
    this.typeBehavior.changeTextTransform(value);
  }

  performContent(value: any) {
    this.html = value.content;
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

  getData(): TextSvgChildData {
    return {
      curve: this.curve,
      fontSize: this.fontSize,
      lineHeight: this.lineHeight,
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
