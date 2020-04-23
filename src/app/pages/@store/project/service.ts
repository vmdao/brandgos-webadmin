import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from '../../../@core/services/rest.service';

import { ProjectModel } from './model';
import { ProjectResultsModel, ProjectResultModel } from './results.model';

const API_CUSTOMERS_URL = '/project';

@Injectable()
export class ProjectService {
  constructor(private restService: RestService) {}

  getAll(params: {}): Observable<ProjectResultsModel> {
    return this.restService.get(API_CUSTOMERS_URL, params);
  }

  get(key): Observable<ProjectResultModel> {
    return this.restService.get(`${API_CUSTOMERS_URL}/${key}`);
  }

  create(model: ProjectModel): Observable<ProjectResultModel> {
    return this.restService.post(API_CUSTOMERS_URL, model);
  }

  update(model: ProjectModel): Observable<ProjectResultModel> {
    const key = model.id;
    return this.restService.put(`${API_CUSTOMERS_URL}/${key}`, model);
  }

  delete(key): Observable<ProjectResultModel> {
    return this.restService.delete(`${API_CUSTOMERS_URL}/${key}`);
  }
}
