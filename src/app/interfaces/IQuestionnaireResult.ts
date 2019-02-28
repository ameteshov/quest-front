export interface IQuestionnaireResult {
  id: number;
  content: Object;
  email: string;
  recipient_name: string;
  recipient_phone?: string;
  score: number;
  is_passed?: boolean;
}
