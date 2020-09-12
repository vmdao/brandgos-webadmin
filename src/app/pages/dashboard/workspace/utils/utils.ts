import Moveable from 'moveable';

export const DATA_ELEMENT_ID = 'data-element-id';
export const DATA_PAGE_ID = 'data-page-id';

export function getPageId(el: HTMLElement | SVGElement) {
  // tslint:disable-next-line: no-non-null-assertion
  return el.getAttribute(DATA_PAGE_ID)!;
}
export function getId(el: HTMLElement | SVGElement) {
  // tslint:disable-next-line: no-non-null-assertion
  return el.getAttribute(DATA_ELEMENT_ID)!;
}
export function getIds(els: Array<HTMLElement | SVGElement>): string[] {
  return els.map((el) => getId(el));
}
export function getEl(selector): HTMLElement {
  return document.querySelector(selector);
}
export function checkInput(target: HTMLElement | SVGElement) {
  const tagName = target.tagName.toLowerCase();

  return (
    (target as HTMLElement).isContentEditable ||
    tagName === 'input' ||
    tagName === 'textarea'
  );
}

export function isNumber(value: any): value is number {
  return typeof value === 'number';
}

export function checkImageLoaded(el: HTMLElement | SVGElement): Promise<any> {
  if (el.tagName.toLowerCase() !== 'img') {
    return Promise.all(
      [].slice
        .call(el.querySelectorAll('img'))
        .map((_el) => checkImageLoaded(_el))
    );
  }
  return new Promise((resolve) => {
    if ((el as HTMLImageElement).complete) {
      resolve();
    } else {
      el.addEventListener('load', function loaded() {
        resolve();

        el.removeEventListener('load', loaded);
      });
    }
  });
}

export class CusMoveable extends Moveable {
  public keepRatio: boolean;
  public target:
    | SVGElement
    | HTMLElement
    | Array<SVGElement | HTMLElement>
    | null;
  public renderDirections: string[];
  public elementGuidelines: Element[];

  public clippable: boolean;
  public clipArea: boolean;
  public dragWithClip: boolean;
  public defaultClipPath: string;
}
