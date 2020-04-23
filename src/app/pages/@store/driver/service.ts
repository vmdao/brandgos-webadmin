import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from '../../../@core/services/rest.service';

import { DriverModel } from './model';
import { DriverResultsModel, DriverResultModel } from './results.model';

const API_CUSTOMERS_URL = '/driver';

@Injectable()
export class DriverService {
  constructor(private restService: RestService) {}

  getAll(params: {}): Observable<DriverResultsModel> {
    return this.restService.get(API_CUSTOMERS_URL, params);
  }

  get(key): Observable<DriverResultModel> {
    return this.restService.get(`${API_CUSTOMERS_URL}/${key}`);
  }

  create(model: DriverModel): Observable<DriverResultModel> {
    return this.restService.post(API_CUSTOMERS_URL, model);
  }

  update(model: DriverModel): Observable<DriverResultModel> {
    const key = model.id;
    return this.restService.put(`${API_CUSTOMERS_URL}/${key}`, model);
  }

  delete(key): Observable<DriverResultModel> {
    return this.restService.delete(`${API_CUSTOMERS_URL}/${key}`);
  }
}
