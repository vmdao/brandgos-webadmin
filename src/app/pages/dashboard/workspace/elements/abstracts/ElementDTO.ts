import { ELEMENT_TYPE } from '../const';

export interface ElementDTO {
  elementId: string;
  elementType: ELEMENT_TYPE | string;

  top: number;
  left: number;

  width: number;
  height: number;

  angle: number;
  transparent: number;

  flipHorizontal: number;
  flipVertical: number;

  order: number;
  locked: number;
}
