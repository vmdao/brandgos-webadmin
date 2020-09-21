import { Command } from './base.interface';
import { BaseElement } from '../../elements/base.abstract';
import { Editor } from '../../Editor';

export class InputCommand implements Command {
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
    this.element.text.performContent({
      content: value,
      callback: callbackUpdateRect,
    });
  }
}
