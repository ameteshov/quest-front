export interface IFilledQuestionnaire {
  content: Array<any>;
  info: {
    name: string;
    phone: string;
    birthday: string;
    email?: string;
  };
}
