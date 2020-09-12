import { Command } from './base.interface';
import { BaseElement } from '../../elements/base.abstract';

export class StrokeWidthCommand implements Command {
  element: BaseElement;
  constructor(element: BaseElement) {
    this.element = element;
  }

  execute(value: number) {
    this.element.svg.performStrokeWidth(value);
  }
}
