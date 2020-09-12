import HistoryManager from './utils/HistoryManager';
import Debugger from './utils/Debugger';
import EventBus from './utils/EventBus';
import Memory from './utils/Memory';
import KeyManager from './utils/KeyManager';
import ClipboardManager from './utils/ClipboardManager';
import MoveableData from './viewport/MoveableData';

import { ToolbarMenu } from './toolkit/toolbar/menu';
import { getViewEl, append } from './utils/HtmlHelper';
import { Component } from './lifecycle/component.astract';
import { SavedDocumentData } from './viewport/DocumentDTO';
import { Viewport } from './viewport/Viewport';
import { PageInfo } from './viewport/PageDTO';
import { Page } from './viewport/Page';
import { getIds } from './utils/utils';
export class Editor extends Component {
  public historyManager = new HistoryManager(this);
  public console = new Debugger(this.params.debug);
  public eventBus = new EventBus();
  public memory = new Memory();
  public moveableData = new MoveableData(this.memory);

  public keyManager = new KeyManager(this.console);
  public clipboardManager = new ClipboardManager(this);

  public viewport = new Viewport();

  el: HTMLElement;
  documentData: SavedDocumentData;

  constructor(private params) {
    super();
  }

  onInit() {
    console.log('onInit');
  }

  onViewed() {
    console.log('onViewed');
    this.viewport.render();
  }

  onDestroy() {
    console.log('onDestroy');
  }

  loadData(documentData: SavedDocumentData) {
    this.documentData = documentData;
    this.appendJSXs(this.documentData.pages);
  }

  public appendJSXs(
    jsxs: PageInfo[],
    isRestore?: boolean
  ): Promise<Array<HTMLElement | SVGElement>> {
    const indexesList = [];

    const indexesListLength = indexesList.length;
    let appendIndex = -1;
    const scopeId = '';

    if (!isRestore && indexesListLength) {
      appendIndex = indexesList[indexesList.length - 1] + 1;
    }

    this.console.log('append jsxs', jsxs, appendIndex, scopeId);

    return this.viewport
      .appendPage(jsxs, appendIndex, scopeId)
      .then(({ added }) => {
        return this.appendComplete(added, isRestore);
      });
  }

  public appendComplete(infos: Page[], isRestore?: boolean) {
    const data = this.moveableData;

    return Promise.all([].map((target) => {})).then(() => {
      return [];
    });
  }

  render(selector) {
    this.el = getViewEl(EDITOR_HTML, {});
    append(selector, this.el);
    super.render();
  }

  remove() {
    super.destroy();
  }
}

const EDITOR_HTML = `
  <div class="viewport">
    <div class="viewport-body">
      <div id="pages"></div>
    </div>
    <div id="toolbar"></div>
  </div>
  `;
