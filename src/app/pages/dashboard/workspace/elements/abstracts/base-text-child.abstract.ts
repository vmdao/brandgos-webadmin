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
    this.parent.typeBehavior = typeBehavior;
  }

  performFontsize(value: any) {
    this.parent.fontSize = value;
    this.parent.typeBehavior.changeFontSize(value);
  }

  performLineHeight(value: any) {
    this.parent.typeBehavior.changeLineHeight(value);
  }

  performTextAlign(value: any) {
    this.parent.typeBehavior.changeTextAlign(value);
  }

  performColor(value: any) {
    this.parent.typeBehavior.changeColor(value);
  }

  performLetterSpacing(value: any) {
    this.parent.typeBehavior.changeLetterSpacing(value);
  }

  performFontFamily(value: any) {
    this.parent.typeBehavior.changeFontfamily(value);
  }

  performCurve(value: any) {
    this.parent.typeBehavior.changeCurve(value);
  }

  perforTextTransform(value: any) {
    this.parent.transform = value;
    this.parent.typeBehavior.changeTextTransform(value);
  }

  performContent(value: any) {
    this.parent.typeBehavior.changeContent(value);
  }
}
