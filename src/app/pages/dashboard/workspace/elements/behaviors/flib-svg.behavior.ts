import { FlipBehavior } from '../interfaces/flip.interface';
import { BaseElement } from '../abstracts/base.abstract';

export class FlipSingleBehavior implements FlipBehavior {
  element: BaseElement;
  $el;

  constructor(element: BaseElement) {
    this.element = element;
    this.$el = element.$el;
  }

  changeHorizontal(value: boolean) {
    this.$el
      .find('.element-inner')
      .css(`transform: scaleX(${value ? '-1' : '1'})`);
  }

  changeVertical(value: boolean) {
    this.$el
      .find('.element-inner')
      .css(`transform: scaleY(${value ? '-1' : '1'})`);
  }
}
