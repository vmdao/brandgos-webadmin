import { AdministratorModel } from './model';
export class AdministratorResultsModel {
  data: AdministratorModel[];
  meta: {
    current_page: number;
    per_page: number;
    total: number;
  };
}

export class AdministratorResultModel {
  data: AdministratorModel;
}
