import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ILoginResponse } from '../interfaces/ILoginResponse';
import { IUser } from '../interfaces/IUser';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { Roles } from '../enums/roles.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private jwtHelper: JwtHelperService,
    private router: Router
  ) { }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  public getUser(): IUser {
    const user = JSON.parse(localStorage.getItem('user'));

    return new User(user);
  }

  public setUser(user: IUser): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public isAuthorized(): boolean {
    const token = localStorage.getItem('token');

    return token !== null;
  }

  public isTokenExpired(): boolean {
    return this.jwtHelper.isTokenExpired();
  }

  public authorize(data: ILoginResponse): void {
    this.setToken(data.token);
    this.setUser(data.user);

    const url = data.user.role_id === Roles.admin ? 'dashboard' : 'panel';

    this.router.navigate([url]);
  }

  public logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.router.navigate(['login']);
  }
}

