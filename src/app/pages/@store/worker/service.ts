import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from '../../../@core/services/rest.service';

import { WorkerModel } from './model';
import { WorkerResultsModel, WorkerResultModel } from './results.model';

const API_CUSTOMERS_URL = '/worker';

@Injectable()
export class WorkerService {
  constructor(private restService: RestService) {}

  getAll(params: {}): Observable<WorkerResultsModel> {
    return this.restService.get(API_CUSTOMERS_URL, params);
  }

  get(key): Observable<WorkerResultModel> {
    return this.restService.get(`${API_CUSTOMERS_URL}/${key}`);
  }

  create(model: WorkerModel): Observable<WorkerResultModel> {
    return this.restService.post(API_CUSTOMERS_URL, model);
  }

  update(model: WorkerModel): Observable<WorkerResultModel> {
    const key = model.id;
    return this.restService.put(`${API_CUSTOMERS_URL}/${key}`, model);
  }

  delete(key): Observable<WorkerResultModel> {
    return this.restService.delete(`${API_CUSTOMERS_URL}/${key}`);
  }
}
