import { IObject } from '@daybrush/utils';
import { PageInfo } from './PageDTO';
import { LayoutDTO } from './LayoutDTO';

export interface SavedDocumentData {
  id?: string;
  name?: string;
  layout?: LayoutDTO;
  pages: PageInfo[];
}
