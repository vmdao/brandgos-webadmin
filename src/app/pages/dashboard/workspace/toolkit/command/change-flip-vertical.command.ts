import { Command } from './base.interface';
import { BaseElement } from '../../elements/abstracts/base.abstract';

export class FlipVerticalCommand implements Command {
  element: BaseElement;
  constructor(element: BaseElement) {
    this.element = element;
  }

  execute(value: boolean) {
    this.element.performFlipVertical(value);
  }
}
