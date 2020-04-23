import { DriverModel } from './model';
export class DriverResultsModel {
  data?: DriverModel[];
  pagination?: {
    totalPages: number;
    page: number;
    size: number;
    totalRecords: number;
  };
  message?: string;
  status?: number;
}

export class DriverResultModel {
  data?: DriverModel;
  validationErrors?: Array<{ field?: string; message?: string }>;
}
