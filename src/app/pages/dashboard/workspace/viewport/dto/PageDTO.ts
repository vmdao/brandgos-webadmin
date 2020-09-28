import { ElementInfo } from './ElementDTO';

export interface PageInfo {
  el?: HTMLElement;
  id?: string;

  scopeId?: string;
  index?: number;

  name?: string;
  width: number;
  height: number;
  elements: Array<ElementInfo>;
}
