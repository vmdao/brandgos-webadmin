import { Command } from './base.interface';
import { BaseElement } from '../../elements/base.abstract';

export class ColorCommand implements Command {
  element: BaseElement;
  constructor(element: BaseElement) {
    this.element = element;
  }

  execute(value: any) {
    if (this.element.elementType === 'textsvg') {
      this.element.text.performColor(value.color);
    } else {
      if (value.code === 'color1') {
        this.element.svg.performColor1(value.color);
      } else if (value.code === 'color2') {
        this.element.svg.performColor2(value.color);
      } else {
        this.element.svg.performColor3(value.color);
      }
    }
  }
}
