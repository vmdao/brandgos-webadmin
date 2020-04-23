import { ProductModel } from './model';
export class ProductResultsModel {
  data?: ProductModel[];
  pagination?: {
    totalPages: number;
    page: number;
    size: number;
    totalRecords: number;
  };
  message?: string;
  status?: number;
}

export class ProductResultModel {
  data?: ProductModel;
  validationErrors?: Array<{ field?: string; message?: string }>;
}
