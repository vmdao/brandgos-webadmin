import { BaseSvgChild } from '../abstracts/base-svg-child.abstract';
import { Color } from '../abstracts/color';

export interface Html {
  colors: Array<Color>;
  strokeWidth: number;
  strokeColor: string;
  borderRadius: number;
  html: BaseSvgChild;
  setHtml(svg: BaseSvgChild);
  renderElement(child);
}
