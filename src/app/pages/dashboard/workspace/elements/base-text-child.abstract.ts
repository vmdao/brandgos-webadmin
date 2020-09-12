import * as jQuery from 'jquery';
import { TypeBehavior } from './interfaces/type.interface';
import { TypeNothingBehavior } from './behaviors/type-nothing.behavior';
import { BaseElement } from './base.abstract';

export interface BaseTextChildData {
  curve: number;
  letterSpacing: number;
  lineHeight: number;
  textAlign: string;
  fontFamily: string;
  transform: string;
  fontSize: number;
  color: string;
  html: string;
}

export abstract class BaseTextChild {
  $dom: any;
  curve: number;
  letterSpacing: number;
  lineHeight: number;
  textAlign: string;
  fontFamily: string;
  transform: string;
  fontSize: number;
  color: string;
  html: string;
  parent: BaseElement;
  typeBehavior: TypeBehavior;

  constructor(options: any, parent) {
    this.parent = parent;
    this.curve = options.style.curve;
    this.fontFamily = options.style.fontFamily;
    this.letterSpacing = options.style.letterSpacing;
    this.lineHeight = options.style.lineHeight;
    this.fontSize = options.style.fontSize;
    this.textAlign = options.style.textAlign;
    this.transform = options.transform || 'none';
    this.color = options.style.color;
    this.html = options.html;

    this.$dom = jQuery(`<div class="element-inner"></div>`);
    this.setTypeBehavior(new TypeNothingBehavior(this.parent));
    this.render();
  }

  render() {
    this.$dom.html(this.html);
    this.elementAppendTo(this.parent.$dom);
  }

  elementAppendTo(parent) {
    this.$dom.appendTo(parent);
  }

  elementRemove() {
    this.$dom.remove();
  }

  elementEmpty() {
    this.$dom.empty();
  }

  setTypeBehavior(typeBehavior: TypeBehavior) {
    this.typeBehavior = typeBehavior;
  }

  performFontsize(value: any) {
    this.fontSize = value;
    this.typeBehavior.changeFontSize(value);
  }

  performLineHeight(value: any) {
    this.typeBehavior.changeLineHeight(value);
  }

  performTextAlign(value: any) {
    this.typeBehavior.changeTextAlign(value);
  }

  performColor(value: any) {
    this.typeBehavior.changeColor(value);
  }

  performLetterSpacing(value: any) {
    this.typeBehavior.changeLetterSpacing(value);
  }

  performFontFamily(value: any) {
    this.typeBehavior.changeFontfamily(value);
  }

  performCurve(value: any) {
    this.typeBehavior.changeCurve(value);
  }

  perforTextTransform(value: any) {
    this.transform = value;
    this.typeBehavior.changeTextTransform(value);
  }

  performContent(value: any) {
    this.typeBehavior.changeContent(value);
  }

  getData(): BaseTextChildData {
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
    };
  }
}
