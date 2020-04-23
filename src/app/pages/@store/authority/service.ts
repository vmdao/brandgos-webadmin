import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from '../../../@core/services/rest.service';

import { AuthorityModel } from './model';
import {
  AuthorityResultsModel,
  AuthorityResultModel,
  AuthorityPermissionsResultModel,
  AppEntitiesResultModel
} from './results.model';

const API_CUSTOMERS_URL = '/authority';

@Injectable()
export class AuthorityService {
  changePassword: any;
  constructor(private restService: RestService) {}

  getAll(params: {}): Observable<AuthorityResultsModel> {
    return this.restService.get(API_CUSTOMERS_URL, params);
  }

  get(key): Observable<AuthorityResultModel> {
    return this.restService.get(`${API_CUSTOMERS_URL}/${key}`);
  }

  create(model: AuthorityModel): Observable<AuthorityResultModel> {
    return this.restService.post(API_CUSTOMERS_URL, model);
  }

  update(model: AuthorityModel): Observable<AuthorityResultModel> {
    const key = model.id;
    return this.restService.put(`${API_CUSTOMERS_URL}/${key}`, model);
  }

  delete(key): Observable<AuthorityResultModel> {
    return this.restService.delete(`${API_CUSTOMERS_URL}/${key}`);
  }

  getPermissions(key): Observable<AuthorityPermissionsResultModel> {
    return this.restService.get(`${API_CUSTOMERS_URL}/${key}/permissions`);
  }

  getAppEntities(): Observable<AppEntitiesResultModel> {
    return this.restService.get(`/appEntity/all`);
  }
}
