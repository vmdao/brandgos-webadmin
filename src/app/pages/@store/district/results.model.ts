import { DistrictModel } from './model';
export class DistrictResultsModel {
  data?: DistrictModel[];
  pagination?: {
    totalPages: number;
    page: number;
    size: number;
    totalRecords: number;
  };
  message?: string;
  status?: number;
}

export class DistrictResultModel {
  data?: DistrictModel;
  validationErrors?: Array<{ field?: string; message?: string }>;
}
