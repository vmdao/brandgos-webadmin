import HistoryManager from './utils/HistoryManager';
import Debugger from './utils/Debugger';
import EventBus from './utils/EventBus';
import Memory from './utils/Memory';
import KeyManager from './utils/KeyManager';
import ClipboardManager from './utils/ClipboardManager';
import MoveableData from './viewport/MoveableData';

import {
  getViewEl,
  append,
  getPageOfElement,
  addPageSelected,
  filterElementsByPage,
} from './utils/HtmlHelper';
import { Component } from './lifecycle/component.astract';
import { SavedDocumentData } from './viewport/DocumentDTO';
import { Viewport } from './viewport/Viewport';
import { PageInfo } from './viewport/PageDTO';
import { Page } from './viewport/Page';
import Selecto from 'selecto';

import { CusMoveable } from './utils/utils';
import { Scrollable } from './viewport/Scroll';
import { isMacintosh } from './utils/consts';
import { MenuFactory } from './utils/MenuFactory';

export class Editor extends Component {
  el: HTMLElement;
  documentData: SavedDocumentData;
  zoom = 1;
  targetsSelected = [];
  public selectoManager: Selecto;
  public historyManager = new HistoryManager(this);
  public console = new Debugger(this.params.debug);
  public eventBus = new EventBus();
  public memory = new Memory();
  public moveableData = new MoveableData(this.memory);

  public keyManager = new KeyManager(this.console);
  public clipboardManager = new ClipboardManager(this);

  scrollable = new Scrollable();
  public viewport: Viewport;
  moveablerSelected: CusMoveable;
  menuFactory = new MenuFactory(this);

  constructor(private params) {
    super();
    this.zoom = params.zoom || 1;
  }

  onInit() {}

  onViewed() {
    this.eventBus.on('changeZoom', (message: { zoom: number }) => {
      this.zoom = message.zoom;
    });

    this.selectoManager = new Selecto({
      container: this.el,
      dragContainer: '.viewport-body',
      selectableTargets: ['.elements .element'],
      hitRate: 0,
      selectByClick: true,
      selectFromInside: false,
      toggleContinueSelect: ['shift'],
      preventDefault: true,
    });

    this.viewport = new Viewport({
      zoom: this.zoom,
      eventBus: this.eventBus,
      moveableData: this.moveableData,
      selectoManager: this.selectoManager,
      historyManager: this.historyManager,
      menuFactory: this.menuFactory,
    });
    this.viewport.render();
    this.setupEvent();
    this.setupHotkey();

    this.selectoManager
      .on('dragStart', (e) => {
        const target = e.inputEvent.target;
        if (
          (this.moveableData.currentMoveabler &&
            this.moveableData.currentMoveabler.isMoveableElement(target)) ||
          this.targetsSelected.some((t) => t === target || t.contains(target))
        ) {
          e.stop();
        }
      })
      .on('select', ({ selected }) => {
        for (const key in this.viewport.moveablers) {
          if (
            Object.prototype.hasOwnProperty.call(this.viewport.moveablers, key)
          ) {
            const moveabler = this.viewport.moveablers[key];
            moveabler.target = [];
          }
        }

        if (!selected.length) {
          this.targetsSelected = selected;
        } else {
          this.eventBus.trigger('select', { elements: selected });
          const renderDirections = [];
          this.moveableData.currentMoveabler.rotatable = false;
          this.moveableData.currentMoveabler.renderDirections = renderDirections;
          this.moveableData.currentMoveabler.target = this.targetsSelected;
        }
      })
      .on('selectEnd', ({ isDragStart, inputEvent, selected }) => {
        if (!this.moveableData.currentMoveabler) {
          return;
        }
        const renderDirections = ['nw', 'ne', 'sw', 'se'];
        this.moveableData.currentMoveabler.renderDirections = renderDirections;
        this.moveableData.currentMoveabler.keepRatio = true;
        this.moveableData.currentMoveabler.rotatable = true;

        this.moveableData.currentMoveabler.target = this.targetsSelected;

        if (isDragStart) {
          inputEvent.preventDefault();
          setTimeout(() => {
            this.moveableData.currentMoveabler.dragStart(inputEvent);
          });
        }
        // if (targetsSelected.length === 1) {
        //   this.selectedElement(jQuery(targetsSelected[0]));
        // } else {
        //   const renderDirections = ['nw', 'ne', 'sw', 'se'];
        //   this.managerMoveabler.renderDirections = renderDirections;
        //   this.managerMoveabler.keepRatio = true;
        //   this.offMenuElements();
        // }
        // const elementsGuidelines = Array.from(
        //   document.querySelectorAll('.elements .element')
        // );
        // this.managerMoveabler.elementGuidelines = elementsGuidelines;
        // selected.forEach((target) => {
        //   getFrame(target);
        // });
        // if (isDragStart) {
        //   inputEvent.preventDefault();
        //   setTimeout(() => {
        //     this.managerMoveabler.dragStart(inputEvent);
        //   });
        // }
      });
  }

  onDestroy() {
    console.log('onDestroy');
  }

  setupEvent() {
    this.eventBus.on('select', ({ elements }) => {
      const firtElement = elements[0];
      const currentPage = getPageOfElement(firtElement);

      if (this.moveableData.currentMoveabler) {
        this.moveableData.currentMoveabler.target = [];
      }
      addPageSelected(currentPage);

      const elementsInPage = filterElementsByPage(currentPage, elements);
      this.targetsSelected = elementsInPage;

      const moveablerSelected = this.viewport.getMoveablerElement(currentPage);
      if (
        this.moveableData.prevMoveabler !== this.moveableData.currentMoveabler
      ) {
        this.moveableData.prevMoveabler = this.moveableData.currentMoveabler;
      }
      this.moveableData.currentMoveabler = moveablerSelected;
    });

    this.scrollable.onScrollPage('.viewport-body', '.page', (pageSelected) => {
      const moveablerSelected = this.viewport.getMoveablerElement(pageSelected);
      if (
        this.moveableData.prevMoveabler !== this.moveableData.currentMoveabler
      ) {
        this.moveableData.prevMoveabler = this.moveableData.currentMoveabler;
      }
      this.moveableData.currentMoveabler = moveablerSelected;
    });
  }

  setupHotkey() {
    this.keyManager.keydown(
      [isMacintosh ? 'meta' : 'ctrl', 'v'],
      () => {},
      'Paste'
    );
    this.keyManager.keydown(
      [isMacintosh ? 'meta' : 'ctrl', 'z'],
      () => {
        this.historyManager.undo();
      },
      'Undo'
    );
    this.keyManager.keydown(
      [isMacintosh ? 'meta' : 'ctrl', 'shift', 'z'],
      () => {
        this.historyManager.redo();
      },
      'Redo'
    );
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
