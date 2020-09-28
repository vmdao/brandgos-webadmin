import { Command } from './base.interface';
import { BaseElement } from '../../elements/abstracts/base.abstract';
import { Editor } from '../../Editor';

export class CurveCommand implements Command {
  element: BaseElement;
  editor: Editor;
  constructor(element: BaseElement, editor: Editor) {
    this.element = element;
    this.editor = editor;
  }

  execute(value: any) {
    const callbackUpdateRect = () => {
      this.editor.moveablerSelected.updateRect();
    };
    this.element.text.performCurve({
      content: value,
      callback: callbackUpdateRect,
    });
  }
}
