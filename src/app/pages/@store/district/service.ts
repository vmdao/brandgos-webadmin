import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from '../../../@core/services/rest.service';

import { DistrictModel } from './model';
import { DistrictResultsModel, DistrictResultModel } from './results.model';

const API_CUSTOMERS_URL = '/district';

@Injectable()
export class DistrictService {
  constructor(private restService: RestService) {}

  getAll(params: {}): Observable<DistrictResultsModel> {
    return this.restService.get(API_CUSTOMERS_URL, params);
  }

  get(key): Observable<DistrictResultModel> {
    return this.restService.get(`${API_CUSTOMERS_URL}/${key}`);
  }

  create(model: DistrictModel): Observable<DistrictResultModel> {
    return this.restService.post(API_CUSTOMERS_URL, model);
  }

  update(model: DistrictModel): Observable<DistrictResultModel> {
    const key = model.id;
    return this.restService.put(`${API_CUSTOMERS_URL}/${key}`, model);
  }

  delete(key): Observable<DistrictResultModel> {
    return this.restService.delete(`${API_CUSTOMERS_URL}/${key}`);
  }
}
