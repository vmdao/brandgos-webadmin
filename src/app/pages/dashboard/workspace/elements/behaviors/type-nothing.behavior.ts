import { TypeBehavior } from '../interfaces/type.interface';
import { BaseElement } from '../abstracts/base.abstract';
export class TypeNothingBehavior implements TypeBehavior {
  element: BaseElement;
  constructor(element: BaseElement) {
    this.element = element;
  }
  render() {}
  changeFontSize(value: number) {}
  changeLineHeight(value: number) {}
  changeTextAlign(value: string) {}
  changeColor(value: string) {}
  changeLetterSpacing(value: number) {}
  changeFontfamily(value: string) {}
  changeCurve(value: number) {}
  changeContent(value: string) {}
  changeTextTransform(value: string) {}
}
