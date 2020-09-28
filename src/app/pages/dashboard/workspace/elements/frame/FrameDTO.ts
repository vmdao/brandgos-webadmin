import { Color } from '../abstracts/color';
import { ElementDTO } from '../abstracts/ElementDTO';

export interface FrameDTO extends ElementDTO {
  isBackground: number;

  colors: Array<Color>;

  strokeWidth: number;
  strokeColor: string;
  borderRadius: number;

  mediaUrl: string;
}
