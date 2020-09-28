import { Command } from './base.interface';
import { Svg } from '../../elements/interfaces/has-svg.interface';

export class StrokeColorCommand implements Command {
  parent: Svg;
  constructor(parent: Svg) {
    this.parent = parent;
  }

  execute(value: any) {
    this.parent.svg.performStrokeColor(value.color);
  }
}
