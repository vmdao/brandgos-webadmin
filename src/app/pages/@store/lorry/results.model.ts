import { LorryModel } from './model';
export class LorryResultsModel {
  data?: LorryModel[];
  pagination?: {
    totalPages: number;
    page: number;
    size: number;
    totalRecords: number;
  };
  message?: string;
  status?: number;
}

export class LorryResultModel {
  data?: LorryModel;
  validationErrors?: Array<{ field?: string; message?: string }>;
}
