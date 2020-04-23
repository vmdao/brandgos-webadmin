import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from '../../../@core/services/rest.service';

import { CriteriaBundleModel } from './model';
import {
  CriteriaBundleResultsModel,
  CriteriaBundleResultModel,
} from './results.model';
import { CriterionResultsModel } from '../criterion';

const API_CUSTOMERS_URL = '/criteriaBundle';

@Injectable()
export class CriteriaBundleService {
  constructor(private restService: RestService) {}

  getAll(params: {}): Observable<CriteriaBundleResultsModel> {
    return this.restService.get(API_CUSTOMERS_URL, params);
  }

  get(key): Observable<CriteriaBundleResultModel> {
    return this.restService.get(`${API_CUSTOMERS_URL}/${key}`);
  }

  create(model: CriteriaBundleModel): Observable<CriteriaBundleResultModel> {
    return this.restService.post(API_CUSTOMERS_URL, model);
  }

  update(model: CriteriaBundleModel): Observable<CriteriaBundleResultModel> {
    const key = model.id;
    return this.restService.put(`${API_CUSTOMERS_URL}/${key}`, model);
  }

  delete(key): Observable<CriteriaBundleResultModel> {
    return this.restService.delete(`${API_CUSTOMERS_URL}/${key}`);
  }

  getCriterions(payload): Observable<CriterionResultsModel> {
    const key = payload.criteriaBundleId;
    return this.restService.get(`${API_CUSTOMERS_URL}/${key}/criteria`);
  }
}
