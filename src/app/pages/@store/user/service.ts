import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from '../../../@core/services/rest.service';

import { UserModel, PasswordModel } from './model';
import { UserResultsModel, UserResultModel } from './results.model';
import {
  AuthorityResultsModel,
  AuthorityPermissionsResultModel
} from '../authority';

const API_CUSTOMERS_URL = '/user';

@Injectable()
export class UserService {
  changePassword: any;
  constructor(private restService: RestService) {}

  getAll(params: {}): Observable<UserResultsModel> {
    return this.restService.get(API_CUSTOMERS_URL, params);
  }

  get(key): Observable<UserResultModel> {
    return this.restService.get(`${API_CUSTOMERS_URL}/${key}`);
  }

  create(model: UserModel): Observable<UserResultModel> {
    return this.restService.post(API_CUSTOMERS_URL, model);
  }

  update(model: UserModel): Observable<UserResultModel> {
    const key = model.id;
    return this.restService.put(`${API_CUSTOMERS_URL}/${key}`, model);
  }

  delete(key): Observable<UserResultModel> {
    return this.restService.delete(`${API_CUSTOMERS_URL}/${key}`);
  }

  getAuthorities(key): Observable<AuthorityResultsModel> {
    return this.restService.get(`${API_CUSTOMERS_URL}/${key}/authorities`);
  }

  getProfile(): Observable<UserResultModel> {
    return this.restService.get(`/myProfile`);
  }

  getProfilePermissions(): Observable<AuthorityPermissionsResultModel> {
    return this.restService.get(`/myPermissions`);
  }

  updateProfilePassword(model: PasswordModel): Observable<UserResultModel> {
    return this.restService.put(`/changeMyPassword`, model);
  }
}
