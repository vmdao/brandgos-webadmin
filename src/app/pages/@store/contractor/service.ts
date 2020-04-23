import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from '../../../@core/services/rest.service';

import { ContractorModel } from './model';
import { ContractorResultsModel, ContractorResultModel } from './results.model';

const API_CUSTOMERS_URL = '/contractor';

@Injectable()
export class ContractorService {
  constructor(private restService: RestService) {}

  getAll(params: {}): Observable<ContractorResultsModel> {
    return this.restService.get(API_CUSTOMERS_URL, params);
  }

  get(key): Observable<ContractorResultModel> {
    return this.restService.get(`${API_CUSTOMERS_URL}/${key}`);
  }

  create(model: ContractorModel): Observable<ContractorResultModel> {
    return this.restService.post(API_CUSTOMERS_URL, model);
  }

  update(model: ContractorModel): Observable<ContractorResultModel> {
    const key = model.id;
    return this.restService.put(`${API_CUSTOMERS_URL}/${key}`, model);
  }

  delete(key): Observable<ContractorResultModel> {
    return this.restService.delete(`${API_CUSTOMERS_URL}/${key}`);
  }
}
