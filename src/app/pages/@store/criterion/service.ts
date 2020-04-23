import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from '../../../@core/services/rest.service';

import { CriterionModel } from './model';
import { CriterionResultsModel, CriterionResultModel } from './results.model';

const API_CUSTOMERS_URL = '/criterion';

@Injectable()
export class CriterionService {
  constructor(private restService: RestService) {}

  getAll(params: {}): Observable<CriterionResultsModel> {
    return this.restService.get(API_CUSTOMERS_URL, params);
  }

  get(key): Observable<CriterionResultModel> {
    return this.restService.get(`${API_CUSTOMERS_URL}/${key}`);
  }

  create(model: CriterionModel): Observable<CriterionResultModel> {
    return this.restService.post(API_CUSTOMERS_URL, model);
  }

  update(model: CriterionModel): Observable<CriterionResultModel> {
    const key = model.id;
    return this.restService.put(`${API_CUSTOMERS_URL}/${key}`, model);
  }

  delete(key): Observable<CriterionResultModel> {
    return this.restService.delete(`${API_CUSTOMERS_URL}/${key}`);
  }
}
