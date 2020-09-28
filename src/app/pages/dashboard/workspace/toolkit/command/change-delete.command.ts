import { Command } from './base.interface';
import { BaseElement } from '../../elements/abstracts/base.abstract';
import { Editor } from '../../Editor';

export class DeleteCommand implements Command {
  element: BaseElement;
  editor: Editor;
  constructor(element: BaseElement, editor: Editor) {
    this.element = element;
    this.editor = editor;
  }
  execute(value: any) {
    // this.editor.offMenuElements();
    // this.editor.deleteElement(this.element);
  }
}
