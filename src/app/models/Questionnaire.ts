import { IQuestionnaire } from '../interfaces/IQuestionnaire';
import { IQuestionnaireContent } from '../interfaces/IQuestionnaireContent';
import { IQuestionnaireResult } from '../interfaces/IQuestionnaireResult';

export class Questionnaire implements IQuestionnaire {
  public id: number;
  public name: string;
  public description: string;
  public content: IQuestionnaireContent;
  public success_score: number;
  public results: Array<IQuestionnaireResult>;
  public type: 'avg' | 'sum' | '';
  public created_at: string;
  public updated_at: string;

  public constructor(data: any = {}) {
    this.id = data.id || '';
    this.name = data.name || '';
    this.description = data.description || '';
    this.content = data.content || {};
    this.success_score = data.success_score || null;
    this.type = data.type || '';
    this.results = data.results || [];

    this.created_at = data.created_at || '';
    this.updated_at = data.updated_at || '';
  }
}
