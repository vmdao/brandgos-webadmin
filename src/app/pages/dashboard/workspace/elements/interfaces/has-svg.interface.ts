import { BaseSvgChild } from '../abstracts/base-svg-child.abstract';
import { Color } from '../abstracts/color';

export interface Svg {
  colors: Array<Color>;
  strokeWidth: number;
  strokeColor: string;
  borderRadius: number;

  svg: BaseSvgChild;
  setSvg(svg: BaseSvgChild);

  renderElement(child);
}
