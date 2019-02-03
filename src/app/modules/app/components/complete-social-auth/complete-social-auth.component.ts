import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { UserApiService } from '../../../../services/user-api.service';
import { mergeMap } from 'rxjs/operators';
import { IUser } from '../../../../interfaces/IUser';

@Component({
  selector: 'app-complete-social-auth',
  templateUrl: './complete-social-auth.component.html',
  styleUrls: ['./complete-social-auth.component.css']
})
export class CompleteSocialAuthComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private userApiService: UserApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  public ngOnInit() {
    this.route
      .queryParams
      .pipe(
        mergeMap((params) => {
          this.authService.setToken(params.token);
          return this.userApiService.profile();
        })
      )
      .subscribe((response: IUser) => {
        this.authService.setUser(response);
        this.router.navigate(['panel/forms']);
      });
  }

}
