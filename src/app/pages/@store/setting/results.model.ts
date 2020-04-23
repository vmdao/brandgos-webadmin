import { SettingModel } from './model';
export class SettingResultsModel {
  data: SettingModel[];
  meta: {
    pageCurrent: number;
    size: number;
    total: number;
  };
}

export class SettingResultModel {
  data: SettingModel;
}
