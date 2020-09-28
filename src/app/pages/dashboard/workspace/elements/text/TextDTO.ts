import { ElementDTO } from '../abstracts/ElementDTO';

export interface TextDTO extends ElementDTO {
  url: string;
  color: string;
  content: string;
  lineHeight: number;
  textAlign: string;
  fontFamily: string;
  transform: string;
  fontSize: number;
  letterSpacing: number;
}
