import { Command } from './base.interface';
import { Svg } from '../../elements/interfaces/has-svg.interface';

export class StrokeWidthCommand implements Command {
  parent: Svg;
  constructor(parent: Svg) {
    this.parent = parent;
  }

  execute(value: number) {
    this.parent.svg.performStrokeWidth(value);
  }
}
