import { BaseElement } from '../../elements/abstracts/base.abstract';

export interface ElementInfo {
  el?: HTMLElement | null;
  id?: string;

  scopeId?: string;
  index?: number;

  name: string;
  frame?: BaseElement;
}
