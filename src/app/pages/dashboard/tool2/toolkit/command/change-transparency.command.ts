import { Command } from './base.interface';
import { BaseElement } from '../../elements/base.abstract';

export class TransparentCommand implements Command {
  element: BaseElement;
  constructor(element: BaseElement) {
    this.element = element;
  }

  execute(value: any) {
    this.element.updateTransparent(value);
  }
}
