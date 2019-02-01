import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { IQuestionnaire } from '../interfaces/IQuestionnaire';
import { IFilledQuestionnaire } from '../interfaces/IFilledQuestionnaire';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireApiService extends ApiService {
  public create(data: IQuestionnaire): Observable<any> {
    return this.post('questionnaires', data);
  }

  public update(id: number, data: Object): Observable<any> {
    return this.put(`questionnaires/${id}`, data);
  }

  public read(id: number, params: {[param: string]: string | string[]} = {}): Observable<any> {
    return this.get(`questionnaires/${id}`, { params: this.getQueryParams(params) });
  }

  public search(data: Object): Observable<any> {
    return this.get('questionnaires', {});
  }

  public send(id: number, data: Object): Observable<any> {
    return this.post(`questionnaires/${id}/send`, { list: data });
  }

  public getByHash(hash: string): Observable<any> {
    return this.get(`forms/${hash}`, {});
  }

  public submit(hash: string, data: IFilledQuestionnaire): Observable<any> {
    return this.post(`forms`, { hash: hash, ...data });
  }

  public getVacancies(): Observable<any> {
    return this.get(`questionnaires/results/vacancies`, {});
  }
  public getStatistic(): Observable<any> {
    return this.get(`questionnaires/statistic`, {});
  }

  public getCandidate(emailAddress: string): Observable<any> {
    return this.get(`questionnaire-results`, { params: {email: emailAddress} });
  }

  public getSingleResult(id: number): Observable<any> {
    return this.get(`questionnaire-results/${id}`, {});
  }
}
