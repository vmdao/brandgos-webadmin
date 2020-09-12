import { IObject, isString, isArray } from '@daybrush/utils';
import { ElementInfo } from './ElementDTO';
import { getId } from '../utils/utils';
export class Viewport {
  public viewport: ElementInfo = {
    name: 'Viewport',
    id: 'viewport',
    children: [],
  };
  elements: IObject<ElementInfo> = {
    viewport: this.viewport,
  };
  constructor() {}

  public makeId(elements: IObject<any> = this.elements) {
    while (true) {
      const id = `id${Math.floor(Math.random() * 100000000)}`;
      if (elements[id]) {
        continue;
      }
      return id;
    }
  }

  public setInfo(id: string, info: ElementInfo) {
    const elements = this.elements;
    elements[id] = info;
  }
  public getInfo(id: string) {
    return this.elements[id];
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
    return this.elements[getId(el)];
  }
  public getInfoByIndexes(indexes: number[]) {
    return indexes.reduce((info: ElementInfo, index: number) => {
      return info.children![index];
    }, this.viewport);
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
  public getViewportInfos() {
    return this.viewport.children!;
  }
  public getIndexes(target: HTMLElement | SVGElement | string): number[] {
    const info = (isString(target)
      ? this.getInfo(target)
      : this.getInfoByElement(target))!;

    if (!info.scopeId) {
      return [];
    }
    const parentInfo = this.getInfo(info.scopeId)!;

    return [
      ...this.getIndexes(info.scopeId),
      parentInfo.children!.indexOf(info),
    ];
  }

  public appendElement(
    jsxs: ElementInfo[],
    appendIndex: number,
    scopeId?: string
  ): Promise<AddedInfo> {
    const jsxInfos = this.registerChildren(jsxs, scopeId);

    jsxInfos.forEach((info, i) => {
      const scopeInfo = this.getInfo(scopeId || info.scopeId!);
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
    });

    return new Promise((resolve) => {
      this.forceUpdate(() => {
        const infos = jsxInfos.map(function registerElement(info) {
          const id = info.id!;

          const target = document.querySelector<HTMLElement>(
            `[${DATA_SCENA_ELEMENT_ID}="${id}"]`
          )!;
          const attrs = info.attrs || {};

          info.el = target;

          for (const name in attrs) {
            target.setAttribute(name, attrs[name]);
          }
          info.attrs = getScenaAttrs(target);
          const children = info.children || [];

          if (children.length) {
            children.forEach(registerElement);
          } else if (info.attrs!.contenteditable) {
            if ('innerText' in info) {
              (target as HTMLElement).innerText = info.innerText || '';
            } else {
              info.innerText = (target as HTMLElement).innerText || '';
            }
          } else if (!info.componentId) {
            if ('innerHTML' in info) {
              target.innerHTML = info.innerHTML || '';
            } else {
              info.innerHTML = target.innerHTML || '';
            }
          }
          return { ...info };
        });
        resolve({
          added: infos,
        });
      });
    });
  }

  public registerChildren(jsxs: ElementInfo[], parentScopeId?: string) {
    return jsxs.map((info) => {
      const id = info.id || this.makeId();
      const children = info.children || [];
      const scopeId = parentScopeId || info.scopeId || 'viewport';

      if (isScenaElement(jsx)) {
        jsxId = this.makeId(this.jsxs);

        this.jsxs[jsxId] = jsx;
        // const component = jsx.type;
        // componentId = component.scenaComponentId;
        // this.components[componentId] = component;
      }
      const elementInfo: ElementInfo = {
        ...info,
        jsx,
        children: this.registerChildren(children, id),
        scopeId,
        componentId,
        jsxId,
        frame: info.frame || {},
        el: null,
        id,
      };
      this.setInfo(id, elementInfo);
      return elementInfo;
    });
  }
}

export interface AddedInfo {
  added: ElementInfo[];
}
export interface RemovedInfo {
  removed: ElementInfo[];
}
export interface MovedInfo {
  info: ElementInfo;
  parentInfo: ElementInfo;
  prevInfo?: ElementInfo;
}
export interface MovedResult {
  moved: ElementInfo[];
  prevInfos: MovedInfo[];
  nextInfos: MovedInfo[];
}
