import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../../../../services/form.service';
import { UserApiService } from '../../../../services/user-api.service';
import swal, { SweetAlertOptions } from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  public userForm: FormGroup;
  public apiErrors: Object;
  public disabled: boolean;

  constructor(
    private fb: FormBuilder,
    private userService: UserApiService,
    private translateService: TranslateService,
    public formService: FormService
  ) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]]
    });
    this.apiErrors = {};
    this.disabled = false;
  }

  public ngOnInit(): void {
  }

  public onSubmit(): void {
    if (this.userForm.valid) {
      this.userService
        .create(this.userForm.value)
        .subscribe(
          () => {
            this.translateService
              .get(['SUCCESS.HEADER', 'USERS.FORM.SUCCESS'])
              .toPromise()
              .then((value) => {
                swal(value['SUCCESS.HEADER'], value['USERS.FORM.SUCCESS'], 'success')
                  .then(() => {
                    this.userForm.reset();
                  });
              });
          },
          (error: HttpErrorResponse) => {
            if (error.status === 422) {
              this.formService.setFormErrors(error, this.userForm, this.apiErrors);
            } else {
              this.translateService
                .get('ERRORS.HEADER')
                .toPromise()
                .then((value) => {
                  swal(value, error.error.message, 'error');
                });
            }
          });
    }
  }
}
