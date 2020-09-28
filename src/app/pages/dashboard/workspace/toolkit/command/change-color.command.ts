import { Command } from './base.interface';
import { Text } from '../../elements/interfaces/has-text.interface';

export class ColorCommand implements Command {
  element: Text;
  constructor(element: Text) {
    this.element = element;
  }

  execute(value: any) {
    this.element.text.performColor(value.color);
  }
}
