export const DATA_ELEMENT_ID = 'data-element-id';

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
