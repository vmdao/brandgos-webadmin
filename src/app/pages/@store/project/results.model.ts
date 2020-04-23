import { ProjectModel } from './model';
export class ProjectResultsModel {
  data?: ProjectModel[];
  pagination?: {
    totalPages: number;
    page: number;
    size: number;
    totalRecords: number;
  };
  message?: string;
  status?: number;
}

export class ProjectResultModel {
  data?: ProjectModel;
  validationErrors?: Array<{ field?: string; message?: string }>;
}
