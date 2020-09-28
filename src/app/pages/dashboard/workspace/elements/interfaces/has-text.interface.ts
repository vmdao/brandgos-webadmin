import { BaseTextChild } from '../abstracts/base-text-child.abstract';

export interface Text {
  color: string;
  curve: number;
  letterSpacing: number;
  lineHeight: number;
  textAlign: string;
  fontFamily: string;
  transform: string;
  fontSize: number;
  content: string;
  text: BaseTextChild;

  setText(text: BaseTextChild);

  renderElement(child);
}
