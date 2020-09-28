import { Command } from './base.interface';
import { Text } from '../../elements/interfaces/has-text.interface';

import { Editor } from '../../Editor';
export class TransformCommand implements Command {
  element: Text;
  editor: Editor;
  constructor(element: Text, editor: Editor) {
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
