import { FontsizeBehavior } from '../interfaces/fontsize.interface';
import { BaseElement } from '../base.element';

export class FontsizeSvgBehavior implements FontsizeBehavior {
  element: BaseElement;
  constructor(element) {
    this.element = element;
  }
  changeFontsize(value) {
    this.element.fontsize = value;
    this.element.$dom.innerHTML(value);
  }
}
