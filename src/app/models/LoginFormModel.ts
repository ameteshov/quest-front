import { ILoginForm } from './../interfaces/ILoginForm';

export class LoginFormModel implements ILoginForm {
  public email: string;
  public password: string;

  public constructor(data: any = {}) {
    this.email = data.email || '';
    this.password = data.password || '';
  }
}
