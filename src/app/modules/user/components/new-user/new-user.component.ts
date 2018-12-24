import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../../../../services/form.service';
import { UserApiService } from '../../../../services/user-api.service';
import swal, { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserApiService,
    public formService: FormService
  ) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]]
    });
  }

  public ngOnInit(): void {
  }

  public onSubmit(): void {
    if (this.userForm.valid) {
      this.userService
        .create(this.userForm.value)
        .subscribe((response) => {
          swal('Success', 'User was created successfully', 'success')
            .then(() => {
              this.userForm.reset();
            });
        });
    }

    console.log(this.userForm);
  }
}
