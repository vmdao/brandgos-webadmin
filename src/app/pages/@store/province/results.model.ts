import { ProvinceModel } from './model';
export class ProvinceResultsModel {
  data?: ProvinceModel[];
  pagination?: {
    totalPages: number;
    page: number;
    size: number;
    totalRecords: number;
  };
  message?: string;
  status?: number;
}

export class ProvinceResultModel {
  data?: ProvinceModel;
  validationErrors?: Array<{ field?: string; message?: string }>;
}
