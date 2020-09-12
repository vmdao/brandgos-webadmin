import { Command } from './base.interface';
import { BaseElement } from '../../elements/base.abstract';
import { Workspace } from '../../workspace';
export class TransformCommand implements Command {
  element: BaseElement;
  workspace: Workspace;
  constructor(element: BaseElement, workspace: Workspace) {
    this.element = element;
    this.workspace = workspace;
  }

  execute(value: boolean) {
    const v = value ? 'uppercase' : 'none';

    const callbackUpdateRect = () => {
      this.workspace.managerMoveabler.updateRect();
    };

    this.element.text.perforTextTransform({
      ...{ value: v },
      callback: callbackUpdateRect,
    });
  }
}
