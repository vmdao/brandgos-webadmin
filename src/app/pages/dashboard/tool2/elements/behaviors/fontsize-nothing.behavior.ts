import { FontsizeBehavior } from '../interfaces/fontsize.interface';
import { BaseElement } from '../base.element';

export class FontsizeNothingBehavior implements FontsizeBehavior {
  element: BaseElement;
  constructor(element: BaseElement) {
    this.element = element;
  }
  changeFontsize() {
    console.log('Cannot change');
  }
}
