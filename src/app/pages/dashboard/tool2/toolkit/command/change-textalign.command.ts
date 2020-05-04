import { Command } from './base.interface';
import { BaseElement } from '../../elements/base.abstract';

export class TextAlignCommand implements Command {
  element: BaseElement;
  constructor(element: BaseElement) {
    this.element = element;
  }

  execute(value: any) {
    this.element.text.performTextAlign(value);
  }
}
