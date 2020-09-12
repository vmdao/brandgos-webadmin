import { Command } from './base.interface';
import { BaseElement } from '../../elements/base.abstract';
import { Workspace } from '../../workspace';

export class CloneCommand implements Command {
  element: BaseElement;
  workspace: Workspace;
  constructor(element: BaseElement, workspace: Workspace) {
    this.element = element;
    this.workspace = workspace;
  }

  execute(value: any) {
    const dataElement = this.element.getData();
    dataElement.top += 20;
    dataElement.left += 20;
    this.workspace.createElement(dataElement);
  }
}
