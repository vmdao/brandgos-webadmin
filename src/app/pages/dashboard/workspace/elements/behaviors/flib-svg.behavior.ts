import { FlipBehavior } from '../interfaces/flip.interface';
import { BaseElement } from '../abstracts/base.abstract';

export class FlipSingleBehavior implements FlipBehavior {
  element: BaseElement;
  $dom;

  constructor(element: BaseElement) {
    this.element = element;
    this.$dom = element.$dom;
  }

  changeHorizontal(value: boolean) {
    this.$dom
      .find('.element-inner')
      .css(`transform: scaleX(${value ? '-1' : '1'})`);
  }

  changeVertical(value: boolean) {
    this.$dom
      .find('.element-inner')
      .css(`transform: scaleY(${value ? '-1' : '1'})`);
  }
}
