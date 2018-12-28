import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { sameValidator } from '../../../../validators/same.validator';
import { AuthApiService } from '../../../../services/auth-api.service';
import { FormService } from '../../../../services/form.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private auth: AuthApiService,
    private router: Router,
    public formService: FormService
  ) {
    this.form = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required]),
      confirm: this.fb.control('', [Validators.required, sameValidator('password')])
    });
  }

  ngOnInit() {
  }

  public onSubmit(): void {
    if (this.form.valid) {
      this.auth
        .register(this.form.value)
        .subscribe(this.onSuccess(), this.onError());
    }
  }

  protected onSuccess(): any {
    return (response: HttpResponse<any>) => {
      swal('Sign up success', 'You registration was successfull. Now you can login', 'success')
        .then(() => this.router.navigate(['login']));
    };
  }

  protected onError(): any {
    return (response: HttpErrorResponse) => {
      if (response.status === 422) {
        const fields = _.keys(response.error.errors);
        for (const key of fields) {
          this.form.controls[key].setErrors({'apiError': response.error.errors[key].join(' ')});
        }
      }
    };
  }

  protected errorHandler(response: HttpErrorResponse): any {
    console.log(response);
    console.log(response.error.errors);
    if (response.status === 422) {
      const fields = _.keys(response.error.errors);
      for (const key of fields) {
        this.form.controls[key].setErrors({'apiError': response.error.errors[key].join(' ')});
      }
    }
  }

}
