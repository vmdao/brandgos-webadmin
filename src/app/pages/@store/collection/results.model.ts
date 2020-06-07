import { CollectionModel } from './model';
export class CollectionResultsModel {
  data?: CollectionModel[];
  pageCount?: number;
  total?: number;
  page: number;
  count?: number;
  message?: string;
  status?: number;
}

export class CollectionResultModel {
  data?: CollectionModel;
  validationErrors?: Array<{ field?: string; message?: string }>;
}
