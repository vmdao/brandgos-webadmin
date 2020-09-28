import { BaseTextChild } from '../abstracts/base-text-child.abstract';
import { TypeBehavior } from '../interfaces/type.interface';

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
  typeBehavior: TypeBehavior;

  text: BaseTextChild;

  setText(text: BaseTextChild);

  renderElement(child);
}
