import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { INewUser } from '../interfaces/INewUser';

@Injectable({
  providedIn: 'root'
})
export class UserApiService extends ApiService {
  public create(data: INewUser): Observable<any> {
    return this.post('users', data);
  }

  public search(params: {} = {}): Observable<any> {
    return this.get('users', { params: params } );
  }

  public update(id: number, data: Object): Observable<any> {
    return this.put(`users/${id}`, data);
  }

  public read(id: number): Observable<any> {
    return this.get(`users/${id}`, {});
  }

  public profile(): Observable<any> {
    return this.get(`users/profile`, {});
  }
}
