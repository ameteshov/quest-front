import { IQuestion } from './IQuestion';

export interface IQuestionnaire {
  id?: number;
  name: string;
  content: Array<IQuestion>;
}
