import { Component } from '../lifecycle/component.astract';
import { PageInfo } from './PageDTO';
import { getViewEl, append, findChildrenEl } from '../utils/HtmlHelper';
import { ElementInfo } from './ElementDTO';
import { IObject, isString } from '@daybrush/utils';
import { getId, DATA_ELEMENT_ID, DATA_PAGE_ID } from '../utils/utils';
import {
  TextSvgElement,
  TextElement,
  SvgDrawElement,
  SvgElement,
} from '../elements';
import EventBus from '../utils/EventBus';
import MoveableData from './MoveableData';
import HistoryManager from '../utils/HistoryManager';
import { Editor } from '../Editor';

export class Page extends Component {
  el: HTMLElement;
  page: PageInfo;
  elements: IObject<HTMLElement> = {};
  ids: IObject<ElementInfo> = {};
  zoom = 1;

  eventBus: EventBus;
  moveableData: MoveableData;
  historyManager: HistoryManager;

  constructor(
    option: { zoom; eventBus: EventBus; historyManager: HistoryManager },
    params
  ) {
    super();
    this.page = params;
    this.zoom = option.zoom;
    this.eventBus = option.eventBus;
    this.historyManager = option.historyManager;
  }

  public makeId(ids: IObject<any> = this.ids) {
    while (true) {
      const id = `element-id${Math.floor(Math.random() * 100000000)}`;
      if (ids[id]) {
        continue;
      }
      return id;
    }
  }

  public setInfo(id: string, info: ElementInfo) {
    const ids = this.ids;
    ids[id] = info;
  }

  public getInfo(id: string) {
    return this.ids[id];
  }

  public getLastChildInfo(id: string) {
    const info = this.getInfo(id);
    const children = info.children!;

    return children[children.length - 1];
  }

  public getNextInfo(id: string) {
    const info = this.getInfo(id);
    const parentInfo = this.getInfo(info.scopeId!)!;
    const parentChildren = parentInfo.children!;
    const index = parentChildren.indexOf(info);

    return parentChildren[index + 1];
  }

  public getPrevInfo(id: string) {
    const info = this.getInfo(id);
    const parentInfo = this.getInfo(info.scopeId!)!;
    const parentChildren = parentInfo.children!;
    const index = parentChildren.indexOf(info);

    return parentChildren[index - 1];
  }

  public getInfoByElement(el: HTMLElement | SVGElement) {
    return this.ids[getId(el)];
  }

  public getElement(id: string) {
    const info = this.getInfo(id);

    return info ? info.el : null;
  }

  public getElements(ids: string[]) {
    return ids.map((id) => this.getElement(id)).filter((el) => el) as Array<
      HTMLElement | SVGElement
    >;
  }

  public getIndex(id: string | HTMLElement) {
    const indexes = this.getIndexes(id);
    const length = indexes.length;
    return length ? indexes[length - 1] : -1;
  }

  public getPageInfos() {
    // tslint:disable-next-line: no-non-null-assertion
    return this.page;
  }

  public getIndexes(target: HTMLElement | SVGElement | string): number[] {
    // tslint:disable-next-line: no-non-null-assertion
    const info = (isString(target)
      ? this.getInfo(target)
      : this.getInfoByElement(target))!;

    if (!info.scopeId) {
      return [];
    }
    // tslint:disable-next-line: no-non-null-assertion
    const parentInfo = this.getInfo(info.scopeId)!;

    return [
      ...this.getIndexes(info.scopeId),
      // tslint:disable-next-line: no-non-null-assertion
      parentInfo.children!.indexOf(info),
    ];
  }

  public appendElement(
    elementInfos: ElementInfo[],
    appendIndex: number,
    scopeId?: string
  ): Promise<AddedElementInfo> {
    const elements = this.registerChildren(elementInfos, scopeId);

    elements.forEach((info, i) => {
      // tslint:disable-next-line: no-non-null-assertion
      const scopeInfo = this.getInfo(scopeId || info.scopeId!);
      info.index = appendIndex + i;
      const elementsEl = findChildrenEl(this.el, '.elements');
      append(elementsEl, info.el);
    });

    return new Promise((resolve) => {
      const infos = elements.map(function registerElement(info) {
        // tslint:disable-next-line: no-non-null-assertion
        const id = info.id!;

        // tslint:disable-next-line: no-non-null-assertion
        const target = document.querySelector<HTMLElement>(
          `[${DATA_ELEMENT_ID}="${id}"]`
        )!;

        info.el = target;
        return { ...info };
      });
      resolve({
        added: infos,
      });
    });
  }

  public registerChildren(elementInfos: ElementInfo[], parentScopeId?: string) {
    return elementInfos.map((info) => {
      const id = info.id || this.makeId();
      const scopeId = parentScopeId || info.scopeId || 'page';

      const elementInfo: ElementInfo = {
        ...info,
        scopeId,
        frame: info.frame || {},
        el: null,
        id,
      };
      const element = this.createElement(elementInfo.frame);

      elementInfo.el = element.$dom.get(0);
      this.setInfo(id, elementInfo);
      return elementInfo;
    });
  }

  public setPageSize() {
    this.el.style.width = this.zoom * this.page.width + 'px';
    this.el.style.height = this.zoom * this.page.height + 64 + 'px';

    const pageBodyEl = findChildrenEl(this.el, '.page-body');
    const elementsEl = findChildrenEl(this.el, '.elements');

    if (this.zoom !== 1) {
      pageBodyEl.style.width = this.page.width + 'px';
      pageBodyEl.style.height = this.page.height + 'px';
      pageBodyEl.style.transform = `scale(${this.zoom})`;
    }

    elementsEl.style.width = this.page.width + 'px';
    elementsEl.style.height = this.page.height + 'px';
  }

  render() {
    this.el = getViewEl(PAGE_HTML, {
      dataName: DATA_PAGE_ID,
      dataValue: this.page.id,
    });
    super.render();
  }

  setupEvent() {
    // this.el.addEventListener('mouseover', ({ target, currentTarget }) => {
    //   if (currentTarget === this.el) {
    //     this.eventBus.trigger('hoverpage', { target: currentTarget });
    //   }
    // });
  }

  remove() {
    super.destroy();
  }

  onInit() {
    console.log('onInit');
  }

  onViewed() {
    this.setPageSize();
    this.setupEvent();
  }

  onDestroy() {
    console.log('onDestroy');
  }

  createElement(dataElement) {
    return this.factoryCreateElement(dataElement);
  }

  factoryCreateElement(dataElement) {
    switch (dataElement.elementType) {
      case 'image':
        return new TextSvgElement(dataElement);
      case 'text':
        return new TextElement(dataElement);
      case 'svgtext':
        return new TextSvgElement(dataElement);
      case 'svgdraw':
        return new SvgDrawElement(dataElement);
      case 'svg':
        return new SvgElement(dataElement);
      default:
        return new SvgElement(dataElement);
    }
  }
}

const PAGE_HTML = `
  <div class="page" <%- dataName %>=<%- dataValue %>>
        <div class="page-heading"></div>
        <div class="page-body">
          <div class="elements"></div>
        </div>
        <div class="page-footer"></div>
  </div>
  `;

export interface AddedElementInfo {
  added: ElementInfo[];
}
export interface RemovedElementInfo {
  removed: ElementInfo[];
}
