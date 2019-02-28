import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { QuestionnaireApiService } from '../services/questionnaire-api.service';
import { IApiResponse } from '../interfaces/IApiResponse';

@Injectable({
  providedIn: 'root'
})
export class RedirectLastSurvey implements CanActivate {
  constructor(
    private questApiService: QuestionnaireApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    this.questApiService
      .search({ all: 1 })
      .subscribe((response: IApiResponse) => {
        return this.router.navigate(['panel/forms', response.data[0].id]);
      });

    return true;
  }
}
