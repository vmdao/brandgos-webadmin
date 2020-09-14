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

    pageBodyEl.style.width = this.page.width + 'px';
    pageBodyEl.style.height = this.page.height + 'px';
    pageBodyEl.style.transform = `scale(${this.zoom})`;

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

  changeView(zoom) {
    this.zoom = zoom;
    this.setPageSize();
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
        <div class="page-heading">
          <div class="page-title"></div>
          <div class="page-controll">
            <button>Up</button>
            <button>Down</button>
            <button class="button-dupplicate"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><g><path style="line-height:normal;font-variant-ligatures:normal;font-variant-position:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-alternates:normal;font-feature-settings:normal;text-indent:0;text-align:start;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#000;text-transform:none;text-orientation:mixed;white-space:normal;shape-padding:0;isolation:auto;mix-blend-mode:normal;solid-color:#000;solid-opacity:1" d="M9.2754 5.9991C8.577 5.9991 8 6.5783 8 7.2765v12.4472c0 .6982.5771 1.2754 1.2754 1.2754h9.4492c.6983 0 1.2754-.5772 1.2754-1.2754V7.2765c0-.6982-.5771-1.2754-1.2754-1.2754zm0 .9727h9.4492c.1766 0 .3027.1281.3027.3047v12.4472c0 .1766-.126.3047-.3027.3047H9.2754c-.1766 0-.3027-.1281-.3027-.3047V7.2765c0-.1766.126-.3047.3027-.3047z" overflow="visible"/><path style="line-height:normal;font-variant-ligatures:normal;font-variant-position:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-alternates:normal;font-feature-settings:normal;text-indent:0;text-align:start;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#000;text-transform:none;text-orientation:mixed;white-space:normal;shape-padding:0;isolation:auto;mix-blend-mode:normal;solid-color:#000;solid-opacity:1" d="M6.2754 2.9991C5.577 2.9991 5 3.5783 5 4.2765v12.4472c0 .6982.5771 1.2754 1.2754 1.2754H7.5v-.9707H6.2754c-.1766 0-.3027-.1281-.3027-.3047V4.2765c0-.1766.126-.3047.3027-.3047h9.4492c.1766 0 .3027.1281.3027.3047v1.2226H17V4.2765c0-.6982-.5771-1.2754-1.2754-1.2754z" overflow="visible"/></g></svg></button>
            <button class="button-delete"><svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 100 100" x="0px" y="0px"><rect x="38.77" y="39.95" width="6" height="33.04"/><rect x="55.23" y="39.95" width="6" height="33.04"/><path d="M56.76,8.2H43.24a8,8,0,0,0-8,8v4.93H15.91a3,3,0,0,0,0,6h5.33l2.91,52.38a13,13,0,0,0,13,12.28H62.88a13,13,0,0,0,13-12.28l2.91-52.38h5.33a3,3,0,0,0,0-6H64.76V16.2A8,8,0,0,0,56.76,8.2Zm-15.51,8a2,2,0,0,1,2-2H56.76a2,2,0,0,1,2,2v4.93H41.24ZM72.76,27.13,69.87,79.19a7,7,0,0,1-7,6.61H37.12a7,7,0,0,1-7-6.61L27.24,27.13H72.76Z"/></svg></button>
          </div>
        </div>
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
