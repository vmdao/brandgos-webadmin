import { CriterionModel } from './model';
export class CriterionResultsModel {
  data?: CriterionModel[];
  pagination?: {
    totalPages: number;
    page: number;
    size: number;
    totalRecords: number;
  };
  message?: string;
  status?: number;
}

export class CriterionResultModel {
  data?: CriterionModel;
  validationErrors?: Array<{ field?: string; message?: string }>;
}
