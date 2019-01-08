import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { IUser } from '../../../../interfaces/IUser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panel-body',
  templateUrl: './panel-body.component.html',
  styleUrls: ['./panel-body.component.css']
})
export class PanelBodyComponent implements OnInit {
  public user: IUser;
  constructor(
    public authService: AuthService,
    private router: Router
  ) {
    this.user = this.authService.getUser();
  }

  public ngOnInit(): void {
    this.authService.userUpdated.subscribe(() => {
      this.user = this.authService.getUser();
    });
  }

  public onPay(): void {
    this.router.navigate(['panel/pay']);
  }
}
