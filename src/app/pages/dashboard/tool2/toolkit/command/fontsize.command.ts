import { Command } from './base.command';
import { BaseElement } from '../../elements/base.element';

export class FontsizeCommand implements Command {
  element: BaseElement;
  constructor(element: BaseElement) {
    this.element = element;
  }

  execute(value: any) {
    this.element.performChangeFontsize(value);
  }
}
