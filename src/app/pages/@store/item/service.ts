import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from '../../../@core/services/rest.service';

import { ItemModel, ITEM_TYPE } from './model';
import { ItemResultsModel, ItemResultModel } from './results.model';

const API_CUSTOMERS_URL = '/items';

@Injectable()
export class ItemService {
  constructor(private restService: RestService) {}

  getAll(params: {}): Observable<ItemResultsModel> {
    return this.restService.get(API_CUSTOMERS_URL, params);
  }

  get(key): Observable<ItemResultModel> {
    return this.restService.get(`${API_CUSTOMERS_URL}/${key}`);
  }

  create(model: ItemModel): Observable<ItemResultModel> {
    return this.restService.post(API_CUSTOMERS_URL, model);
  }

  update(model: ItemModel): Observable<ItemResultModel> {
    const key = model.id;
    return this.restService.patch(`${API_CUSTOMERS_URL}/${key}`, model);
  }

  delete(key): Observable<ItemResultModel> {
    return this.restService.delete(`${API_CUSTOMERS_URL}/${key}`);
  }

  search(query: {
    tag?: string;
    key?: string;
    collectionCode?: string;
    type?: ITEM_TYPE;
  }) {
    return this.restService.get(`${API_CUSTOMERS_URL}/search/all`, query);
  }

  searchNounProject(query: {
    tag?: string;
    key?: string;
    collectionCode?: string;
    type?: ITEM_TYPE;
  }) {
    return this.restService.get(
      `${API_CUSTOMERS_URL}/search/nounproject`,
      query
    );
  }

  render(params) {
    return this.restService.download(`/templates/render`, params);
  }
}
