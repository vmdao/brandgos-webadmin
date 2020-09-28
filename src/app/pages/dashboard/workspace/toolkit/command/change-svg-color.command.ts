import { Command } from './base.interface';
import { Svg } from '../../elements/interfaces/has-svg.interface';
import { Color } from '../../elements/abstracts/color';

export class SvgColorCommand implements Command {
  element: Svg;
  constructor(element: Svg) {
    this.element = element;
  }

  execute(value: any) {
    let message: Color;
    if (value.code === 'color1') {
      message = { order: 1, color: value.color };
    } else if (value.code === 'color2') {
      message = { order: 2, color: value.color };
    } else {
      message = { order: 3, color: value.color };
    }

    this.element.svg.performColor(message);
  }
}
