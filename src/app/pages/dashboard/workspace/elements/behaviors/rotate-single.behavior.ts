import { BaseElement } from '../abstracts/base.abstract';
import { MoveBehavior } from '../interfaces/move.interface';

export class MoveSingleBehavior implements MoveBehavior {
  element: BaseElement;
  constructor(element: BaseElement) {
    this.element = element;
  }
  changePosition(value: { top: number; left: number }) {
    console.log('changePosition');
    this.element.setLeft(value.left);
    this.element.setTop(value.top);
    this.element.$el.css(value);
  }
}
