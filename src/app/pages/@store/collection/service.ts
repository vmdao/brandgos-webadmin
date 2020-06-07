import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from '../../../@core/services/rest.service';

import { CollectionModel } from './model';
import { CollectionResultsModel, CollectionResultModel } from './results.model';

const API_CUSTOMERS_URL = '/collections';

@Injectable()
export class CollectionService {
  changePassword: any;
  constructor(private restService: RestService) {}

  getAll(params: {}): Observable<CollectionResultsModel> {
    return this.restService.get(API_CUSTOMERS_URL, params);
  }

  get(key): Observable<CollectionResultModel> {
    return this.restService.get(`${API_CUSTOMERS_URL}/${key}`);
  }

  create(model: CollectionModel): Observable<CollectionResultModel> {
    return this.restService.post(API_CUSTOMERS_URL, model);
  }

  update(model: CollectionModel): Observable<CollectionResultModel> {
    const key = model.id;
    return this.restService.put(`${API_CUSTOMERS_URL}/${key}`, model);
  }

  delete(key): Observable<CollectionResultModel> {
    return this.restService.delete(`${API_CUSTOMERS_URL}/${key}`);
  }
}
