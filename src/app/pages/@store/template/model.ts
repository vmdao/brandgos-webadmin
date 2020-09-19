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

export interface TemplateModel {
  id?: number;
  version?: number;
  name?: string;
  brief?: string;
  description?: string;
  files?: Array<File>;
  priority?: number;
  type?: TEMPLATE_CONTENT_TYPE;
  collections: Array<any>;
  tags: Array<string>;
  material?: MaterialModel;
  status?: TEMPLATE_STATUS;
  deleted?: boolean;
}

export enum TEMPLATE_CONTENT_TYPE {
  BACKGROUND = 'background',
  LAYOUT = 'layout',
  TEXTGROUP = 'text-g',
}

export interface File {
  quality?: FILE_QUANLITY;
  width?: number;
  height?: number;
  bucket?: string;
  url?: string;
  key?: string;
  isWatermark?: boolean;
}

export enum FILE_TYPE {
  VECTOR = 'VECTOR',
  RASTER = 'RASTER',
}

export enum FILE_QUANLITY {
  THUMBNAIL = 'THUMBNAIL',
  SCREEN = 'SCREEN',
  ORIGIN = 'ORIGIN',
  PRINT_NORMAL = 'PRINT_NORMAL',
  PRINT_HEIGHT = 'PRINT_HEIGHT',
}

export enum MATERIAL_STATUS {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  SUBMIT = 'submit_global',
  REJECT_SUBMIT = 'reject_submit',
  APPROVAL_SUBMIT = 'approval_submit',
}

export enum TEMPLATE_STATUS {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  SUBMIT = 'submit_global',
  REJECT_SUBMIT = 'reject_submit',
  APPROVAL_SUBMIT = 'approval_submit',
}
