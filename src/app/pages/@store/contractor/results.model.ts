import { ContractorModel } from './model';
export class ContractorResultsModel {
  data?: ContractorModel[];
  pagination?: {
    totalPages: number;
    page: number;
    size: number;
    totalRecords: number;
  };
  message?: string;
  status?: number;
}

export class ContractorResultModel {
  data?: ContractorModel;
  validationErrors?: Array<{ field?: string; message?: string }>;
}
