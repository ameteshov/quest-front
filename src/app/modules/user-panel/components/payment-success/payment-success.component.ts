import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { UserApiService } from '../../../../services/user-api.service';
import { IUser } from '../../../../interfaces/IUser';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private userService: UserApiService
  ) { }

  public ngOnInit(): void {
    this.userService
      .read(this.authService.getUser().id)
      .subscribe((response: IUser) => {
        this.authService.setUser(response);
      });
  }

}
