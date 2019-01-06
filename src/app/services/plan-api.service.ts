import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { IPlan } from '../interfaces/IPlan';
import { IApiResponse } from '../interfaces/IApiResponse';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlanApiService extends ApiService {
  public create(data: IPlan): Observable<any> {
    return this.post('plans', data);
  }

  public read(id: number): Observable<any> {
    return this.get(`plans/${id}`, {});
  }

  public search(params: {} = {}): Observable<IApiResponse> {
    return this.get('plans', { params: params } );
  }

  public update(id: number, data: Object): Observable<HttpResponse<any>> {
    return this.put(`plans/${id}`, data);
  }
}
