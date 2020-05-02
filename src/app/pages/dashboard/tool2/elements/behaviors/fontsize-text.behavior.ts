import { FontsizeBehavior } from '../interfaces/fontsize.interface';
import { BaseElement } from '../base.element';

export class FontsizeTextBehavior implements FontsizeBehavior {
  element: BaseElement;
  constructor(element) {
    this.element = element;
  }
  changeFontsize(value: number) {
    console.log('ChangeFontsizeText');
    this.element.fontsize = value;
    this.element.$dom.innerHTML(value);
  }
}
