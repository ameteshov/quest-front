import { IQuestionnaireContent } from './IQuestionnaireContent';

export interface IQuestionnaire {
  id?: number;
  name: string;
  content: IQuestionnaireContent;
  is_active?: boolean;
}
