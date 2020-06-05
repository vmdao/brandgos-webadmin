import { Command } from './base.interface';
import { BaseElement } from '../../elements/base.abstract';

export class TransparencyCommand implements Command {
  element: BaseElement;
  constructor(element: BaseElement) {
    this.element = element;
  }

  execute(value: any) {
    this.element.updateTransparency(value / 100);
  }
}
