import { IObject, isString } from '@daybrush/utils';
import { getId, isNumber, getEl } from '../utils/utils';
import { PageInfo } from './PageDTO';
import { SavedDocumentData } from './DocumentDTO';
import { append, getViewEl } from '../utils/HtmlHelper';
import { Page } from './Page';
import { DATA_PAGE_ID } from '../utils/consts';
import { Component } from '../lifecycle/component.astract';

export class Viewport extends Component {
  public viewport: SavedDocumentData = {
    name: 'Viewport',
    id: 'viewport',
    pages: [],
  };
  el: HTMLElement;
  pages: IObject<HTMLElement> = {};
  ids: IObject<Page> = {};

  constructor() {
    super();
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
  }

  onDestroy() {
    console.log('onDestroy');
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
      const page = new Page(info);
      this.setPageInfo(id, page);
      return page;
    });
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
    });

    return new Promise((resolve) => {
      const infos = pages.map(function registerElement(info) {
        // tslint:disable-next-line: no-non-null-assertion
        const id = info.page.id!;
        const selector = `[${DATA_PAGE_ID}="${id}"]`;
        // tslint:disable-next-line: no-non-null-assertion
        const target = getEl(selector)!;
        info.el = target;
        return info;
      });
      resolve({
        added: infos,
      });
    });
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
