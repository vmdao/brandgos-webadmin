import { ElementDTO } from '../abstracts/ElementDTO';

export interface TextSvgDTO extends ElementDTO {
  url: string;
  color: string;
  curve: number;
  content: string;
  lineHeight: number;
  textAlign: string;
  fontFamily: string;
  transform: string;
  fontSize: number;
  letterSpacing: number;
}
