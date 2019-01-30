import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthApiService } from '../../../../services/auth-api.service';
import { AuthService } from '../../../../services/auth.service';
import { FormService } from '../../../../services/form.service';
import { ILoginResponse } from '../../../../interfaces/ILoginResponse';
import swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public apiErrors: Object;

  constructor(
    private fb: FormBuilder,
    private authApiService: AuthApiService,
    private authService: AuthService,
    private translateService: TranslateService,
    public formService: FormService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.apiErrors = {};
  }

  ngOnInit() {
  }

  public onSubmit(): void {
    if (this.loginForm.valid) {
      this.authApiService
        .login(this.loginForm.value)
        .subscribe(
          (response: ILoginResponse) => {
            this.authService.authorize(response);
          },
          (error: HttpErrorResponse) => {
            if (error.status === 422) {
              this.formService.setFormErrors(error, this.loginForm, this.apiErrors);
            } else {
              this.translateService
                .get('ERRORS.HEADER')
                .toPromise()
                .then((value) => {
                  swal(value, error.error.message, 'error');
                });
            }
          }
        );
    }
  }

  public onGoogleAuth(): void {
    this.authApiService
      .loginWithGoogle()
      .subscribe((data) => {
        window.location = data.url;
      });
  }

}
