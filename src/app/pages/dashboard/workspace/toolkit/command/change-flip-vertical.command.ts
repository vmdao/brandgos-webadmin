import { Command } from './base.interface';
import { BaseElement } from '../../elements/base.abstract';

export class FlipVerticalCommand implements Command {
  element: BaseElement;
  constructor(element: BaseElement) {
    this.element = element;
  }

  execute(value: boolean) {
    console.log(1234, value);
    this.element.performFlipVertical(value);
  }
}
