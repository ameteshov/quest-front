export interface IQuestionnaireResult {
  id: number;
  score: number;
  recipient_name: string;
  is_passed?: boolean;
}
