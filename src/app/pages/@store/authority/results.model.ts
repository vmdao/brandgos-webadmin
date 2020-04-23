import {
  AuthorityModel,
  AuthorityPermissionsModel,
  AppEntityModel
} from './model';
export class AuthorityResultsModel {
  data?: AuthorityModel[];
  pagination?: {
    totalPages: number;
    page: number;
    size: number;
    totalRecords: number;
  };
  message?: string;
  status?: number;
}

export class AuthorityResultModel {
  data?: AuthorityModel;
  validationErrors?: Array<{ field?: string; message?: string }>;
}

export class AuthorityPermissionsResultModel {
  status?: number;
  message?: any;
  data?: AuthorityPermissionsModel[];
  validationErrors?: Array<{ field?: string; message?: string }>;
}

export class AppEntitiesResultModel {
  data?: AppEntityModel[];
  validationErrors?: Array<{ field?: string; message?: string }>;
}
