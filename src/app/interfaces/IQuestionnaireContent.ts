import { IQuestion } from './IQuestion';
import { IAnswer } from './IAnswer';

export interface IQuestionnaireContent {
  questions: Array<IQuestion>;
  answers: Array<IAnswer>;
}
