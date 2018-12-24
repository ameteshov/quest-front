import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { IQuestionnaire } from '../interfaces/IQuestionnaire';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireApiService extends ApiService {
  public create(data: IQuestionnaire): Observable<any> {
    return this.post('questionnaires', data);
  }

  public search(data: Object): Observable<any> {
    return this.get('questionnaires', {});
  }

  public send(id: number, data: Object): Observable<any> {
    return this.post(`questionnaires/${id}/send`, { list: data});
  }

  public getByHash(hash: string): Observable<any> {
    return this.get(`forms/${hash}`, {});
  }
}
