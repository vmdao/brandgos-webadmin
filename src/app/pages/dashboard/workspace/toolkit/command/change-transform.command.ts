import { Command } from './base.interface';
import { BaseElement } from '../../elements/abstracts/base.abstract';
import { Editor } from '../../Editor';
export class TransformCommand implements Command {
  element: BaseElement;
  editor: Editor;
  constructor(element: BaseElement, editor: Editor) {
    this.element = element;
    this.editor = editor;
  }

  execute(value: boolean) {
    const v = value ? 'uppercase' : 'none';

    const callbackUpdateRect = () => {
      this.editor.moveablerSelected.updateRect();
    };

    this.element.text.perforTextTransform({
      ...{ value: v },
      callback: callbackUpdateRect,
    });
  }
}
