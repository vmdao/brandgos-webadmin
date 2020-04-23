import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from '../../../@core/services/rest.service';

import { LorryModel } from './model';
import { LorryResultsModel, LorryResultModel } from './results.model';

const API_CUSTOMERS_URL = '/lorry';

@Injectable()
export class LorryService {
  constructor(private restService: RestService) {}

  getAll(params: {}): Observable<LorryResultsModel> {
    return this.restService.get(API_CUSTOMERS_URL, params);
  }

  get(key): Observable<LorryResultModel> {
    return this.restService.get(`${API_CUSTOMERS_URL}/${key}`);
  }

  create(model: LorryModel): Observable<LorryResultModel> {
    return this.restService.post(API_CUSTOMERS_URL, model);
  }

  update(model: LorryModel): Observable<LorryResultModel> {
    const key = model.id;
    return this.restService.put(`${API_CUSTOMERS_URL}/${key}`, model);
  }

  delete(key): Observable<LorryResultModel> {
    return this.restService.delete(`${API_CUSTOMERS_URL}/${key}`);
  }
}
