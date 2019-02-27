import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormService } from '../../../../services/form.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../../services/auth.service';
import { AuthApiService } from '../../../../services/auth-api.service';
import swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  public resetForm: FormGroup;
  public apiErrors: Object;

  constructor(
    private fb: FormBuilder,
    private authApiService: AuthApiService,
    private authService: AuthService,
    private translateService: TranslateService,
    public formService: FormService
  ) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.apiErrors = {};
  }

  ngOnInit() {
  }

  public onSubmit(): void {
    if (this.resetForm.valid) {
      this.authApiService
        .resetPassword(this.resetForm.value)
        .subscribe(
          (response: any) => {
            this.authService.authorize(response);
          },
          (error: HttpErrorResponse) => {
            if (error.status === 422) {
              this.formService.setFormErrors(error, this.resetForm, this.apiErrors);
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
}
