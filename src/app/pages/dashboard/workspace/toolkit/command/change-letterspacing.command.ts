import { Command } from './base.interface';
import { Editor } from '../../Editor';
import { Text } from '../../elements/interfaces/has-text.interface';

export class LetterSpacingCommand implements Command {
  element: Text;
  editor: Editor;
  constructor(element: Text, editor: Editor) {
    this.element = element;
    this.editor = editor;
  }

  execute(value: any) {
    const callbackUpdateRect = () => {
      this.editor.moveablerSelected.updateRect();
    };

    this.element.text.performLetterSpacing({
      content: value,
      callback: callbackUpdateRect,
    });
  }
}
