import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { IQuestionnaireType } from '../interfaces/IQuestionnaireType';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireTypeApiService extends ApiService {
  public create(data: IQuestionnaireType): Observable<any> {
    return this.post('questionnaires/types', data);
  }

  public update(id: number, data: Object): Observable<any> {
    return this.put(`questionnaires/types/${id}`, data);
  }

  public read(id: number, params: {[param: string]: string | string[]} = {}): Observable<any> {
    return this.get(`questionnaires/types/${id}`, { params: this.getQueryParams(params) });
  }

  public search(data: Object): Observable<any> {
    return this.get('questionnaires/types', {});
  }
}
