import { IObject, isString, isArray } from '@daybrush/utils';
import { BaseElement } from '../elements/base.abstract';
export interface ElementInfo {
  name: string;
  frame?: IObject<BaseElement>;
  scopeId?: string;
  children?: ElementInfo[];
  el?: HTMLElement | null;
  id?: string;
  index?: number;
  innerHTML?: string;
}
