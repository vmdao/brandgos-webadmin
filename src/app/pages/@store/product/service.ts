import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from '../../../@core/services/rest.service';

import { ProductModel } from './model';
import { ProductResultsModel, ProductResultModel } from './results.model';

const API_CUSTOMERS_URL = '/product';

@Injectable()
export class ProductService {
  constructor(private restService: RestService) {}

  getAll(params: {}): Observable<ProductResultsModel> {
    return this.restService.get(API_CUSTOMERS_URL, params);
  }

  get(key): Observable<ProductResultModel> {
    return this.restService.get(`${API_CUSTOMERS_URL}/${key}`);
  }

  create(model: ProductModel): Observable<ProductResultModel> {
    return this.restService.post(API_CUSTOMERS_URL, model);
  }

  update(model: ProductModel): Observable<ProductResultModel> {
    const key = model.id;
    return this.restService.put(`${API_CUSTOMERS_URL}/${key}`, model);
  }

  delete(key): Observable<ProductResultModel> {
    return this.restService.delete(`${API_CUSTOMERS_URL}/${key}`);
  }
}
