import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from '../../../@core/services/rest.service';

import { ProvinceModel } from './model';
import { ProvinceResultsModel, ProvinceResultModel } from './results.model';
import { DistrictResultsModel } from '../district';

const API_CUSTOMERS_URL = '/province';

@Injectable()
export class ProvinceService {
  constructor(private restService: RestService) {}

  getAll(params: {}): Observable<ProvinceResultsModel> {
    return this.restService.get(API_CUSTOMERS_URL, params);
  }

  get(key): Observable<ProvinceResultModel> {
    return this.restService.get(`${API_CUSTOMERS_URL}/${key}`);
  }

  create(model: ProvinceModel): Observable<ProvinceResultModel> {
    return this.restService.post(API_CUSTOMERS_URL, model);
  }

  update(model: ProvinceModel): Observable<ProvinceResultModel> {
    const key = model.id;
    return this.restService.put(`${API_CUSTOMERS_URL}/${key}`, model);
  }

  delete(key): Observable<ProvinceResultModel> {
    return this.restService.delete(`${API_CUSTOMERS_URL}/${key}`);
  }

  getDistricts(key, options): Observable<DistrictResultsModel> {
    return this.restService.get(
      `${API_CUSTOMERS_URL}/${key}/districts`,
      options
    );
  }
}
