import { CriteriaBundleModel } from './model';
export class CriteriaBundleResultsModel {
  data?: CriteriaBundleModel[];
  pagination?: {
    totalPages: number;
    page: number;
    size: number;
    totalRecords: number;
  };
  message?: string;
  status?: number;
}

export class CriteriaBundleResultModel {
  data?: CriteriaBundleModel;
  validationErrors?: Array<{ field?: string; message?: string }>;
}
