import { Command } from './base.interface';
import { BaseElement } from '../../elements/base.abstract';

export class LineHeightCommand implements Command {
  element: BaseElement;
  constructor(element: BaseElement) {
    this.element = element;
  }

  execute(value: any) {
    this.element.text.performLineHeight(value);
  }
}
