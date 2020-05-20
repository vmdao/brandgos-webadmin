import { TypeBehavior } from '../interfaces/type.interface';
import { BaseElement } from '../base.abstract';
export class TypeTextBehavior implements TypeBehavior {
  element: BaseElement;
  constructor(element: BaseElement) {
    this.element = element;
  }
  changeFontsize(value: number) {}
  changeLineHeight(value: number) {}
  changeTextAlign(value: string) {}
  changeColor(value: string) {}
  changeLetterSpacing(value: number) {}
  changeContent(value: string) {}
  changeFontfamily(value: string) {}
  changeCurve(value: number) {}
}
