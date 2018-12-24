import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, Subscription, Subject } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { filter, switchMap } from 'rxjs/operators';
import { AuthApiService } from '../services/auth-api.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing: boolean;
  private refreshTokenSubject: Subject<any>;

  constructor(
    private authService: AuthService,
    private authApiService: AuthApiService
  ) {
    this.isRefreshing = false;
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isTokenExpired() && !this.isRefreshing && !this.isPublicRequest(req)) {
      this.isRefreshing = true;
      this.refreshTokenSubject = new Subject<any>();

      this.authApiService
        .refreshToken(this.authService.getToken())
        .subscribe((result: HttpResponse<any>) => {
          const token = result.headers.get('Authorization').split(' ')[1];

          this.authService.setToken(token);
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token);
        }, (error) => {
          this.authService.logout();
          this.isRefreshing = false;

          return Observable.throw(error);
        });
    }

    if (this.isRefreshing && !this.isPublicRequest(req)) {
      return this.refreshTokenSubject
        .pipe(
          filter(token => token !== null),
          switchMap(() => next.handle(this.addTokenToRequest(req)))
        );
    }

    return next.handle(this.addTokenToRequest(req));
  }

  protected addTokenToRequest(req: HttpRequest<any>): HttpRequest<any> {
    const token = this.authService.getToken();
    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });

    return cloned;
  }

  protected isRefreshingRequest(req: HttpRequest<any>): boolean {
    return req.url.indexOf('refresh') !== -1;
  }

  protected isAuthorizationRequired(req: HttpRequest<any>): boolean {
    return !this.isPublicRequest(req);
  }

  protected isPublicRequest(req: HttpRequest<any>): boolean {
    const paths = ['auth', 'forms'];
    const result = paths.filter( item => req.url.indexOf(item) !== -1);

    return result.length !== 0;
  }
}
