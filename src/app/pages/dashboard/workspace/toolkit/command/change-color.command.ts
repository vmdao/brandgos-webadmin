import { Command } from './base.interface';
import { BaseElement } from '../../elements/abstracts/base.abstract';

export class ColorCommand implements Command {
  element: BaseElement;
  constructor(element: BaseElement) {
    this.element = element;
  }

  execute(value: any) {
    this.element.text.performColor(value.color);
  }
}
