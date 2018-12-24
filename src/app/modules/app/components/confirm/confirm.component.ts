import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from '../../../../services/form.service';
import { sameValidator } from '../../../../validators/same.validator';
import { AuthApiService } from '../../../../services/auth-api.service';
import { HttpResponse } from '@angular/common/http';
import swal from 'sweetalert2';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  public confirmForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthApiService,
    public formService: FormService
  ) {
    this.confirmForm = this.fb.group({
      password: ['', [Validators.required]],
      confirm: ['', [Validators.required, sameValidator('password')]],
      hash: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.route
      .queryParamMap
      .subscribe(
        (params) => this.confirmForm.controls.hash.patchValue(params.get('token')
      )
    );
  }

  public onSubmit(): void {
    if (this.confirmForm.valid) {
      this.authService
        .confirm(this.confirmForm.value)
        .subscribe((response: HttpResponse<any>) => {
          swal('success', 'Password set, now you can login', 'success')
            .then(() => {
              this.router.navigate(['/login']);
            });
        });
    }
  }
}
