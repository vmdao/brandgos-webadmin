export interface MaterialModel {
  id?: number;
  bucket?: string;
  pathOrigin?: string;
  pathHigh?: string;
  pathNormal?: string;
  pathThumb?: string;
  deleted?: boolean;
  updatedAt?: string;
  createdAt?: string;
}

export interface ItemModel {
  id?: number;
  code?: string;
  version?: number;
  title?: string;
  brief?: string;
  priority?: number;
  type?: ITEM_TYPE;
  collections: Array<any>;
  tags: Array<string>;
  material?: MaterialModel;
  status?: ITEM_STATUS;
  deleted?: boolean;
  updatedAt?: string;
  createdAt?: string;
}

export enum ITEM_TYPE {
  SVG = 'svg',
  FONT = 'font',
  IMAGE = 'image',
}

export enum ITEM_STATUS {
  DRAFT = 'draft',
  CANCELLED = 'cancelled',
  PUBLISHED = 'published',
}
