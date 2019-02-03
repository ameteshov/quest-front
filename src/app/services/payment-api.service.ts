import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { IPlan } from '../interfaces/IPlan';
import { IApiResponse } from '../interfaces/IApiResponse';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentApiService extends ApiService {
  public read(id: number): Observable<any> {
    return this.get(`payments/${id}`, {});
  }

  public search(params: {} = {}): Observable<IApiResponse> {
    return this.get('payments', { params: params } );
  }
}
