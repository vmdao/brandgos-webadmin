import { Command } from './base.interface';
import { BaseElement } from '../../elements/abstracts/base.abstract';
import { Editor } from '../../Editor';

export class CloneCommand implements Command {
  element: BaseElement;
  editor: Editor;
  constructor(element: BaseElement, editor: Editor) {
    this.element = element;
    this.editor = editor;
  }

  execute(value: any) {
    const dataElement = this.element.getData();
    dataElement.top += 20;
    dataElement.left += 20;
    // this.editor.createElement(dataElement);
  }
}
