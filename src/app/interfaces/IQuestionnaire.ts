import { IQuestionnaireContent } from './IQuestionnaireContent';
import { IQuestionnaireResult } from './IQuestionnaireResult';

export interface IQuestionnaire {
  id?: number;
  name: string;
  content: IQuestionnaireContent;
  description?: string;
  results?: Array<IQuestionnaireResult>;
  is_active?: boolean;
  result_type?: 'sum' | 'avg' | '';
  type_id?: number;
  success_score?: number;
  user_id?: number;
}
