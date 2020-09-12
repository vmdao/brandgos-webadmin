import { ElementInfo } from './ElementDTO';

export interface PageInfo {
  name?: string;
  scopeId?: string;
  el?: HTMLElement | null;
  id?: string;
  index?: number;
  elements: Array<ElementInfo>;
}
