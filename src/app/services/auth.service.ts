import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ILoginResponse } from '../interfaces/ILoginResponse';
import { IUser } from '../interfaces/IUser';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { Roles } from '../enums/roles.enum';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userUpdated: Subject<IUser>;

  constructor(
    private jwtHelper: JwtHelperService,
    private router: Router
  ) {
    this.userUpdated = new Subject<IUser>();
  }

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

    this.userUpdated.next(user);
  }

  public isAuthorized(): boolean {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token === null || user === null) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      return false;
    }

    return localStorage.getItem('user') !== null;
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

