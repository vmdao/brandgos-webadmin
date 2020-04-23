import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from '../../../@core/services/rest.service';

import { AdministratorModel } from './model';
import {
  AdministratorResultsModel,
  AdministratorResultModel
} from './results.model';

const API_CUSTOMERS_URL = 'administrators';

@Injectable()
export class AdministratorService {
  constructor(private restService: RestService) {}

  getAll(params: {}): Observable<AdministratorResultsModel> {
    return this.restService.get(API_CUSTOMERS_URL, params);
  }

  get(key): Observable<AdministratorResultModel> {
    return this.restService.get(`${API_CUSTOMERS_URL}/${key}`);
  }

  create(model: AdministratorModel): Observable<AdministratorResultModel> {
    return this.restService.post(API_CUSTOMERS_URL, model);
  }

  update(model: AdministratorModel): Observable<AdministratorResultModel> {
    const key = model.id;
    return this.restService.put(`${API_CUSTOMERS_URL}/${key}`, model);
  }

  delete(key): Observable<AdministratorResultModel> {
    return this.restService.delete(`${API_CUSTOMERS_URL}/${key}`);
  }
}
