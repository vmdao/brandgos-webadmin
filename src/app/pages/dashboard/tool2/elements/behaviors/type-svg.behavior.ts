import { TypeBehavior } from '../interfaces/type.interface';
import { BaseElement } from '../base.abstract';

export class TypeSvgBehavior implements TypeBehavior {
  element: BaseElement;
  constructor(element: BaseElement) {
    this.element = element;
  }
  changeFontsize(value: number) {}
  changeLineHeight(value: number) {}
  changeTextAlign(value: string) {}
  changeColor(value: string) {}
  changeLetterSpacing(value: number) {}
  changeFontfamily(value: string) {}
  changeCurve(value: number) {}
  changeContent(value: string) {}
}
