import { ItemModel } from '../item';

export enum COLLECTION_STATUS {
  DRAFT = 'draft',
  CANCELLED = 'cancelled',
  PUBLISHED = 'published',
}
export interface CollectionModel {
  id?: number;
  code?: string;
  title?: string;
  priority?: number;
  items?: ItemModel[];
  parent?: CollectionModel;
  children?: CollectionModel[];
  status?: COLLECTION_STATUS;
  deleted?: boolean;
  updatedAt?: string;
  createdAt?: string;
}
