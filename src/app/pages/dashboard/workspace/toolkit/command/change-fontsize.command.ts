import { Command } from './base.interface';
import { BaseElement } from '../../elements/base.abstract';
import { Workspace } from '../../workspace';

export class FontsizeCommand implements Command {
  element: BaseElement;
  workspace: Workspace;
  constructor(element: BaseElement, workspace: Workspace) {
    this.element = element;
    this.workspace = workspace;
  }
  execute(value: any) {
    const callbackUpdateRect = () => {
      this.workspace.managerMoveabler.updateRect();
    };

    this.element.text.performFontsize({
      ...value,
      callback: callbackUpdateRect,
    });
  }
}
