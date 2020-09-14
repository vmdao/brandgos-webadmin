import { IObject, isString } from '@daybrush/utils';
import {
  getId,
  getEl,
  getPageId,
  checkImageLoaded,
  CusMoveable,
} from '../utils/utils';
import { PageInfo } from './PageDTO';
import { SavedDocumentData } from './DocumentDTO';
import { append } from '../utils/HtmlHelper';
import { Page } from './Page';
import { DATA_PAGE_ID } from '../utils/consts';
import { Component } from '../lifecycle/component.astract';
import { ElementInfo } from './ElementDTO';
import MoveableData from './MoveableData';
import EventBus from '../utils/EventBus';
import Selecto from 'selecto';
import HistoryManager from '../utils/HistoryManager';
import { Editor } from '../Editor';
import { diff } from '@egjs/list-differ';

export class Viewport extends Component {
  public viewport: SavedDocumentData = {
    name: 'Viewport',
    id: 'viewport',
    pages: [],
  };

  el: HTMLElement;
  pages: IObject<HTMLElement> = {};
  ids: IObject<Page> = {};
  zoom = 1;

  eventBus: EventBus;
  moveableData: MoveableData;
  moveablers: IObject<CusMoveable> = {};
  moveablerSelected: CusMoveable;
  selectoManager: Selecto;
  historyManager: HistoryManager;
  constructor(option: {
    zoom;
    eventBus: EventBus;
    moveableData: MoveableData;
    selectoManager: Selecto;
    historyManager: HistoryManager;
  }) {
    super();
    this.zoom = option.zoom;
    this.moveableData = option.moveableData;
    this.eventBus = option.eventBus;
    this.selectoManager = option.selectoManager;
    this.historyManager = option.historyManager;
  }

  render() {
    this.el = getEl('#pages');
    super.render();
  }

  onInit() {
    console.log('onInit');
  }

  onViewed() {
    console.log('onViewed');
    this.setupEvent();
  }

  onDestroy() {
    console.log('onDestroy');
  }

  setupEvent() {
    this.historyManager.registerType('render', undoRender, redoRender);
    this.historyManager.registerType('renders', undoRenders, redoRenders);
  }

  public makeId(ids: IObject<any> = this.ids) {
    while (true) {
      const id = `page-id${Math.floor(Math.random() * 100000000)}`;
      if (ids[id]) {
        continue;
      }
      return id;
    }
  }

  public setPageInfo(id: string, info: Page) {
    const ids = this.ids;
    ids[id] = info;
  }

  public getMoveabler(id: string) {
    return this.moveablers[id];
  }

  public setMoveabler(id: string, info: CusMoveable) {
    const moveablers = this.moveablers;
    moveablers[id] = info;
  }

  public getMoveablerElement(el: HTMLElement | SVGElement) {
    return this.moveablers[getPageId(el)];
  }

  public getPageInfo(id: string) {
    return this.ids[id];
  }

  public getInfoByElement(el: HTMLElement | SVGElement) {
    return this.ids[getId(el)];
  }

  public getPage(id: string) {
    const info = this.getPageInfo(id);

    return info ? info.el : null;
  }

  public getPages(ids: string[]) {
    return ids.map((id) => this.getPage(id)).filter((el) => el) as Array<
      HTMLElement | SVGElement
    >;
  }

  public getIndex(id: string | HTMLElement) {
    const indexes = this.getIndexes(id);
    const length = indexes.length;
    return length ? indexes[length - 1] : -1;
  }

  public getViewportInfos() {
    return this.viewport;
  }

  public getIndexes(target: HTMLElement | SVGElement | string): number[] {
    // tslint:disable-next-line: no-non-null-assertion
    const info = (isString(target)
      ? this.getPageInfo(target)
      : this.getInfoByElement(target))!;

    if (!info.page.scopeId) {
      return [];
    }

    return [...this.getIndexes(info.page.scopeId)];
  }

  public registerPages(jsxs: PageInfo[], parentScopeId?: string) {
    return jsxs.map((info) => {
      const id = info.id || this.makeId();
      const scopeId = parentScopeId || info.scopeId || 'viewport';
      info.scopeId = scopeId;
      info.id = id;
      const page = new Page(
        {
          zoom: this.zoom,
          eventBus: this.eventBus,
          historyManager: this.historyManager,
        },
        info
      );
      this.setPageInfo(id, page);

      return page;
    });
  }

  changeView(zoom) {
    this.zoom = zoom;
    for (const id in this.ids) {
      if (Object.prototype.hasOwnProperty.call(this.ids, id)) {
        const page = this.ids[id];
        page.changeView(zoom);
      }
    }
    if (this.moveableData.currentMoveabler) {
      this.moveableData.currentMoveabler!.updateRect();
    }
  }

  public getSortedIndexesList(
    targets: Array<string | HTMLElement | SVGElement | number[]>
  ) {
    const indexesList = targets.map((target) => {
      if (Array.isArray(target)) {
        return target;
      }
      // tslint:disable-next-line: no-non-null-assertion
      return this.getIndexes(target!);
    });

    indexesList.sort((a, b) => {
      const aLength = a.length;
      const bLength = b.length;
      const length = Math.min(aLength, bLength);

      for (let i = 0; i < length; ++i) {
        if (a[i] === b[i]) {
          continue;
        }
        return a[i] - b[i];
      }
      return aLength - bLength;
    });

    return indexesList;
  }

  public getSortedTargets(targets: Array<string | HTMLElement | SVGElement>) {
    // tslint:disable-next-line: no-non-null-assertion
    return this.getSortedInfos(targets).map((info) => info.el!);
  }

  public getSortedInfos(targets: Array<string | HTMLElement | SVGElement>) {
    const indexesList = this.getSortedIndexesList(targets);
    return [];
    // return indexesList.map((indexes) => this.getInfoByIndexes(indexes));
  }

  public appendPage(
    jsxs: PageInfo[],
    appendIndex: number,
    scopeId?: string
  ): Promise<AddedPageInfo> {
    const pages = this.registerPages(jsxs, scopeId);
    pages.forEach((info, i) => {
      // tslint:disable-next-line: no-non-null-assertion
      const scopeInfo = this.getPageInfo(scopeId || info.page.scopeId!);
      info.page.index = appendIndex + i;
      info.render();

      append(this.el, info.el);

      this.appendElement(info, info.page.elements).then((ok) => {});
    });

    return new Promise((resolve) => {
      const infos = pages.map((info) => {
        // tslint:disable-next-line: no-non-null-assertion
        const id = info.page.id!;
        const selector = `[${DATA_PAGE_ID}="${id}"]`;
        // tslint:disable-next-line: no-non-null-assertion
        const target = getEl(selector)!;
        info.el = target;
        // const pageBody = findChildrenEl(target, '.page-body')
        const moveabler = new CusMoveable(info.el, {
          zoom: 1,
          edge: false,
          keepRatio: true,
          pinchable: true,
          roundable: true,

          draggable: true,
          resizable: true,
          rotatable: true,

          throttleDrag: 0,
          throttleResize: 1,
          throttleRotate: 0,

          snappable: true,
          snapCenter: true,
          snapHorizontal: true,
          snapVertical: true,
          snapElement: true,
          snapThreshold: 0,
          elementGuidelines: [],
          checkInput: true,
          className: 'uplevo',
          isDisplaySnapDigit: false,
          dragArea: true,
        });

        moveabler
          .on('dragStart', this.moveableData.onDragStart)
          .on('drag', this.moveableData.onDrag)
          .on('dragGroupStart', this.moveableData.onDragGroupStart)
          .on('dragGroup', this.moveableData.onDragGroup);

        moveabler
          .on('rotateStart', this.moveableData.onRotateStart)
          .on('rotate', this.moveableData.onRotate)
          .on('rotateGroupStart', this.moveableData.onRotateGroupStart)
          .on('rotateGroup', this.moveableData.onRotateGroup);

        moveabler
          .on('resizeStart', this.moveableData.onResizeStart)
          .on('resize', this.moveableData.onResize)
          .on('resizeGroupStart', this.moveableData.onResizeGroupStart)
          .on('resizeGroup', this.moveableData.onResizeGroup);

        moveabler
          .on('click', ({ target }) => {
            // console.log('renderStart');
          })
          .on('clickGroup', ({ inputEvent, inputTarget }) => {
            this.selectoManager.clickTarget(inputEvent, inputTarget);
          })

          .on('renderStart', ({ datas, target }) => {
            datas.prevData = this.moveableData.getFrame(target).get();
          })
          .on('render', ({ datas }) => {
            // console.log('renderStart');
            datas.isRender = true;
          })
          .on('renderEnd', ({ datas, target }) => {
            this.eventBus.requestTrigger('render');

            if (!datas.isRender) {
              return;
            }
            this.historyManager.addAction('render', {
              id: target,
              prev: datas.prevData,
              next: this.moveableData.getFrame(target).get(),
              currentPage: info,
              moveabler: moveabler,
            });
          })
          .on('renderGroupStart', ({ datas, targets }) => {
            datas.prevDatas = targets.map((target) =>
              this.moveableData.getFrame(target).get()
            );
          })
          .on('renderGroup', ({ datas }) => {
            this.eventBus.requestTrigger('renderGroup');
            datas.isRender = true;
          })
          .on('renderGroupEnd', ({ datas, targets }) => {
            this.eventBus.requestTrigger('renderGroup');
            if (!datas.isRender) {
              return;
            }
            const prevDatas = datas.prevDatas;
            const infos = targets.map((target, i) => {
              return {
                id: target,
                prev: prevDatas[i],
                next: this.moveableData.getFrame(target).get(),
              };
            });
            this.historyManager.addAction('renders', {
              infos,
              currentPage: info,
              moveabler: moveabler,
            });
          });

        this.setMoveabler(id, moveabler);
        return info;
      });
      resolve({
        added: infos,
      });
    });
  }

  public appendElement(
    page: Page,
    elementInfos: ElementInfo[],
    isRestore?: boolean
  ): Promise<Array<HTMLElement | SVGElement>> {
    const appendIndex = -1;
    const scopeId = '';

    return page
      .appendElement(elementInfos, appendIndex, scopeId)
      .then(({ added }) => {
        return this.appendElementComplete(added, isRestore);
      });
  }

  public appendElementComplete(infos: ElementInfo[], isRestore?: boolean) {
    if (!isRestore) {
      // this.historyManager.addAction('createElements', {
      //   infos,
      //   prevSelected: getIds(this.getSelectedTargets()),
      // });
    }

    const data = this.moveableData;
    const targets = infos
      .map(function registerFrame(info) {
        // tslint:disable-next-line: no-non-null-assertion
        data.createFrame(info.el!, info.frame);
        // tslint:disable-next-line: no-non-null-assertion
        data.render(info.el!);

        // tslint:disable-next-line: no-non-null-assertion
        // info.children!.forEach(registerFrame);
        // tslint:disable-next-line: no-non-null-assertion
        return info.el!;
      })
      .filter((el) => el);

    return Promise.all(targets.map((target) => checkImageLoaded(target))).then(
      () => {
        this.setSelectedTargets(targets, true);
        return targets;
      }
    );
  }

  public setSelectedTargets(
    targets: Array<HTMLElement | SVGElement>,
    isRestore?: boolean
  ) {
    targets = targets.filter((target) => {
      return targets.every((parnetTarget) => {
        return parnetTarget === target || !parnetTarget.contains(target);
      });
    });

    return targets;
  }
}

export interface AddedPageInfo {
  added: Page[];
}

export interface RemovedPageInfo {
  removed: PageInfo[];
}

export interface MovedPageInfo {
  info: PageInfo;
  parentInfo: PageInfo;
  prevInfo?: PageInfo;
}

function restoreRender(
  id: HTMLElement,
  state: IObject<any>,
  prevState: IObject<any>,
  orders: any,
  editor: Editor,
  currentPage,
  moveabler
) {
  const el = id;
  if (!el) {
    console.error('No Element');
    return false;
  }
  const moveableData = editor.moveableData;
  const frame = moveableData.getFrame(el);

  frame.clear();
  frame.set(state);
  frame.setOrderObject(orders);

  const result = diff(Object.keys(prevState), Object.keys(state));
  const { removed, prevList } = result;

  removed.forEach((index) => {
    el.style.removeProperty(prevList[index]);
  });
  moveableData.render(el);
  return true;
}

function undoRender(
  { id, prev, next, prevOrders, currentPage, moveabler }: IObject<any>,
  editor: Editor
) {
  if (
    !restoreRender(id, prev, next, prevOrders, editor, currentPage, moveabler)
  ) {
    return;
  }

  moveabler.updateRect();
  editor.eventBus.trigger('render');
}

function redoRender(
  { id, prev, next, nextOrders, currentPage, moveabler }: IObject<any>,
  editor: Editor
) {
  if (
    !restoreRender(id, next, prev, nextOrders, editor, currentPage, moveabler)
  ) {
    return;
  }
  moveabler.updateRect();
  editor.eventBus.trigger('render');
}

function redoRenders(
  { infos, currentPage, moveabler }: IObject<any>,
  editor: Editor
) {
  infos.forEach(({ id, next, prev, nextOrders }: IObject<any>) => {
    restoreRender(id, next, prev, nextOrders, editor, currentPage, moveabler);
  });
  moveabler.updateRect();
  editor.eventBus.trigger('render');
}

function undoRenders(
  { infos, moveabler, currentPage }: IObject<any>,
  editor: Editor
) {
  infos.forEach(({ id, prev, next, prevOrders }: IObject<any>) => {
    restoreRender(id, prev, next, prevOrders, editor, currentPage, moveabler);
  });
  moveabler.updateRect();
  editor.eventBus.trigger('render');
}