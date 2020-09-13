import { BaseElement } from '../elements/base.abstract';

export interface ElementInfo {
  name: string;
  frame?: any;
  scopeId?: string;
  children?: ElementInfo[];
  el?: HTMLElement | null;
  id?: string;
  index?: number;
  innerHTML?: string;
}
