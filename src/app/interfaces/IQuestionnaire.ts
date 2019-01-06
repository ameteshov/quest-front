import { IQuestionnaireContent } from './IQuestionnaireContent';
import { IQuestionnaireResult } from './IQuestionnaireResult';

export interface IQuestionnaire {
  id?: number;
  name: string;
  content: IQuestionnaireContent;
  description: string;
  results?: Array<IQuestionnaireResult>;
  is_active?: boolean;
  type?: 'sum' | 'avg' | '';
  success_score?: number;
}
