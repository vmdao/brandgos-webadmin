export interface TypeBehavior {
  render();

  changeFontSize(value: number);

  changeLineHeight(value: number);

  changeTextAlign(value: string);

  changeColor(value: string);

  changeLetterSpacing(value: number);

  changeCurve(value: number);

  changeContent(value: string);

  changeFontfamily(value: string);

  changeTextTransform(value: string);
}
