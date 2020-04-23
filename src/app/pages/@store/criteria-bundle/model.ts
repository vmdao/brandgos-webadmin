import { CriterionModel } from '../criterion';

export interface CriteriaBundleModel {
  id?: number;
  name?: string;
  criteria?: Array<CriterionModel>;
  remove?: Array<number>;
  addNew?: Array<CriterionModel>;
  update?: Array<CriterionModel>;
}
