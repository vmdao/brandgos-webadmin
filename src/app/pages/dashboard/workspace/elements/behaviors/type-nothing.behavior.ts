import { TypeBehavior } from '../interfaces/type.interface';
import { Text } from '../interfaces/has-text.interface';
export class TypeNothingBehavior implements TypeBehavior {
  parent: Text;

  constructor(parent: Text) {
    this.parent = parent;
  }

  render() {}

  changeFontSize(value: number) {}
  changeLineHeight(value: number) {}
  changeTextAlign(value: string) {}
  changeColor(value: string) {}
  changeLetterSpacing(value: number) {}
  changeFontfamily(value: string) {}
  changeCurve(value: number) {}
  changeContent(value: string) {}
  changeTextTransform(value: string) {}
}
