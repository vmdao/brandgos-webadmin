import { BaseElement } from '../abstracts/base.abstract';
import { MoveBehavior } from '../interfaces/move.interface';

export class MoveNothingBehavior implements MoveBehavior {
  element: BaseElement;
  constructor(element: BaseElement) {
    this.element = element;
  }
  changePosition(value: { top: number; left: number }) {
    console.log('changePosition');
  }
}
