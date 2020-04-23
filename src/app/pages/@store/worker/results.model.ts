import { WorkerModel } from './model';
export class WorkerResultsModel {
  data?: WorkerModel[];
  pagination?: {
    totalPages: number;
    page: number;
    size: number;
    totalRecords: number;
  };
  message?: string;
  status?: number;
}

export class WorkerResultModel {
  data?: WorkerModel;
  validationErrors?: Array<{ field?: string; message?: string }>;
}
