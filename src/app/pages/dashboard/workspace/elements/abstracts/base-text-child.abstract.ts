import * as jQuery from 'jquery';
import { TypeBehavior } from '../interfaces/type.interface';
import { TypeNothingBehavior } from '../behaviors/type-nothing.behavior';
import { Text } from '../interfaces/has-text.interface';

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
  $el: any;
  parent: Text;
  typeBehavior: TypeBehavior;

  constructor(parent: Text) {
    this.parent = parent;
    this.$el = jQuery(`<div class="element-inner"></div>`);
    this.setTypeBehavior(new TypeNothingBehavior(this.parent));
  }

  appendTo(parent) {
    this.$el.appendTo(parent);
  }

  elementRemove() {
    this.$el.remove();
  }

  elementEmpty() {
    this.$el.empty();
  }

  setTypeBehavior(typeBehavior: TypeBehavior) {
    this.typeBehavior = typeBehavior;
  }

  performFontsize(value: any) {
    this.parent.fontSize = value;
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
    this.parent.transform = value;
    this.typeBehavior.changeTextTransform(value);
  }

  performContent(value: any) {
    this.typeBehavior.changeContent(value);
  }
}
