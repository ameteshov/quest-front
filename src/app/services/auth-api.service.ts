import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ILoginForm } from '../interfaces/ILoginForm';
import { Observable } from 'rxjs';
import { IRegisterForm } from '../interfaces/IRegisterForm';
import { IResetForm } from '../interfaces/IResetForm';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService extends ApiService {
  public login(data: ILoginForm): Observable<any> {
    return this.post('auth/login', data);
  }

  public resetPassword(data: IResetForm): Observable<any> {
    return this.post('auth/reset-password', data);
  }

  public refreshToken(token: string): Observable<any> {
    return this.getResponse('auth/refresh');
  }

  public confirm(data: any): Observable<any> {
    return this.post('auth/confirm-password', data);
  }

  public register(data: IRegisterForm): Observable<any> {
    return this.post('auth/register', data);
  }

  public loginWith(provider: string): Observable<any> {
    return this.get(`social-login/${provider}`, {});
  }
}
