import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthApiService } from '../../../../services/auth-api.service';
import { AuthService } from '../../../../services/auth.service';
import { FormService } from '../../../../services/form.service';
import { ILoginResponse } from '../../../../interfaces/ILoginResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authApiService: AuthApiService,
    private authService: AuthService,
    public formService: FormService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
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
          (error) => {
            console.log(error);
          }
        );
    }
  }

}
