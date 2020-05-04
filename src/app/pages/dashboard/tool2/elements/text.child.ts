import * as jQuery from 'jquery';
import { TypeBehavior } from './interfaces/type.interface';
import { TypeNothingBehavior } from './behaviors/type-nothing.behavior';
import { BaseElement } from './base.abstract';

export class TextChild {
  $dom: any;

  fontsize: number;
  curve: number;
  letterSpacing: number;
  lightHeight: number;
  textAlign: string;
  fontFamily: string;
  color: string;
  html: string;
  parent: BaseElement;
  typeBehavior: TypeBehavior;

  constructor(options: any, parent) {
    this.parent = parent;
    this.curve = options.curve;
    this.fontsize = options.fontsize;
    this.fontFamily = options.fontFamily;
    this.letterSpacing = options.letterSpacing;
    this.lightHeight = options.lightHeight;
    this.textAlign = options.textAlign;
    this.color = options.color;
    this.html = options.html;

    this.$dom = jQuery(`<div></div>`);
    this.$dom.addClass('element');

    this.setTypeBehavior(new TypeNothingBehavior(this.parent));
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

  performFontsize(fontsize: number) {
    this.typeBehavior.changeFontsize(fontsize);
  }

  performLineHeight(value: number) {
    this.typeBehavior.changeLineHeight(value);
  }

  performTextAlign(value: string) {
    this.typeBehavior.changeTextAlign(value);
  }

  performColor(value: string) {
    this.typeBehavior.changeColor(value);
  }

  performLetterSpacing(value: number) {
    this.typeBehavior.changeLetterSpacing(value);
  }

  performFontFamily(value: number) {
    this.typeBehavior.changeFontfamily(value);
  }

  performCurve(value: number) {
    this.typeBehavior.changeCurve(value);
  }

  performContent(value: string) {
    this.typeBehavior.changeContent(value);
  }
}
