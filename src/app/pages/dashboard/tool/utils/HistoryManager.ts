import { IObject } from '@daybrush/utils';
import { Workspace } from '../workspace/workspace';

export type RestoreCallback = (props: IObject<any>, editor: Workspace) => any;
export interface HistoryAction {
  type: string;
  props: IObject<any>;
}
export default class HistoryManager {
  private undoStack: HistoryAction[] = [];
  private redoStack: HistoryAction[] = [];
  private types: IObject<{ redo: RestoreCallback; undo: RestoreCallback }> = {};
  constructor(private editor: Workspace) {}
  public registerType(
    type: string,
    undo: RestoreCallback,
    redo: RestoreCallback
  ) {
    this.types[type] = { undo, redo };
  }
  public addAction(type: string, props: IObject<any>) {
    this.editor.console.log(`Add History:`, type, props);
    this.undoStack.push({
      type,
      props,
    });
    this.redoStack = [];
  }
  public undo() {
    const undoAction = this.undoStack.pop();

    if (!undoAction) {
      return;
    }
    this.editor.console.log(`undo: ${undoAction.type}`, undoAction.props);
    this.types[undoAction.type].undo(undoAction.props, this.editor);
    this.redoStack.push(undoAction);
  }
  public redo() {
    const redoAction = this.redoStack.pop();

    if (!redoAction) {
      return;
    }
    this.editor.console.log(`redo: ${redoAction.type}`, redoAction.props);
    this.types[redoAction.type].redo(redoAction.props, this.editor);
    this.undoStack.push(redoAction);
  }
}
