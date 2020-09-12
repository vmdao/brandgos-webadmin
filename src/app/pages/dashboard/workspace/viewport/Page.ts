import { Component } from '../lifecycle/component.astract';
import { PageInfo } from './PageDTO';
import { getViewEl, append } from '../utils/HtmlHelper';
import { ElementInfo } from './ElementDTO';
import { IObject, isString } from '@daybrush/utils';
import { getId, isNumber, DATA_ELEMENT_ID } from '../utils/utils';

export class Page extends Component {
  el: HTMLElement;
  page: PageInfo;
  elements: IObject<HTMLElement> = {};
  ids: IObject<ElementInfo> = {};

  constructor(params) {
    super();
    this.page = params;
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
    const jsxInfos = this.registerChildren(elementInfos, scopeId);

    jsxInfos.forEach((info, i) => {
      // tslint:disable-next-line: no-non-null-assertion
      const scopeInfo = this.getInfo(scopeId || info.scopeId!);
      // tslint:disable-next-line: no-non-null-assertion
      const children = scopeInfo.children!;

      if (appendIndex > -1) {
        children.splice(appendIndex + i, 0, info);
        info.index = appendIndex + i;
      } else if (isNumber(info.index)) {
        children.splice(info.index, 0, info);
      } else {
        info.index = children.length;
        children.push(info);
      }

      append(this.el, info.el);
    });

    return new Promise((resolve) => {
      const infos = jsxInfos.map(function registerElement(info) {
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

  public registerChildren(jsxs: ElementInfo[], parentScopeId?: string) {
    return jsxs.map((info) => {
      const id = info.id || this.makeId();
      const children = info.children || [];
      const scopeId = parentScopeId || info.scopeId || 'page';

      const elementInfo: ElementInfo = {
        ...info,
        children: this.registerChildren(children, id),
        scopeId,
        frame: info.frame || {},
        el: null,
        id,
      };
      this.setInfo(id, elementInfo);
      return elementInfo;
    });
  }

  render() {
    this.el = getViewEl(PAGE_HTML, {});
    console.log(this);
    super.render();
  }

  remove() {
    super.destroy();
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
}

const PAGE_HTML = `
  <div class="page">
        <div class="page-heading"></div>
        <div class="page-body"></div>
        <div class="page-footer"></div>
  </div>
  `;

export interface AddedElementInfo {
  added: ElementInfo[];
}
export interface RemovedElementInfo {
  removed: ElementInfo[];
}
