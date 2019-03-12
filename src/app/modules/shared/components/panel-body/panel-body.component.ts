import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { IUser } from '../../../../interfaces/IUser';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { switchMap, filter, map } from 'rxjs/operators';
import { UserApiService } from '../../../../services/user-api.service';

@Component({
  selector: 'app-panel-body',
  templateUrl: './panel-body.component.html',
  styleUrls: ['./panel-body.component.css']
})
export class PanelBodyComponent implements OnInit {
  public showShop = false;
  public showUser = false;
  public showMenu = false;
  public user: IUser;

  constructor(
    public authService: AuthService,
    private userService: UserApiService,
    private router: Router
  ) {
    this.user = this.authService.getUser();
  }

  public closeMiniModal(): void {
    this.showUser = false;
    this.showShop = false;
  }
  public openShop(): void {
    this.showUser = false;
    this.showShop = !this.showShop;
    setTimeout(() => this.showShop = false, 3000);
  }
  public openUser(): void {
    this.showShop = false;
    this.showUser = !this.showUser;
    setTimeout(() => this.showUser = false, 3000);
  }
  public openMenu(): void {
    if (this.showMenu === false) {
      document.body.style.overflow = 'hidden';
    }
    if (this.showMenu === true) {
      document.body.style.overflow = 'auto';
    }
    this.showMenu = !this.showMenu;
  }

  public ngOnInit(): void {
    this.authService.userUpdated.subscribe(() => {
      this.user = this.authService.getUser();
    });

    timer(1000, 30000)
      .pipe(
        switchMap(() => {
          return this.userService.read(this.authService.getUser().id);
        }),
        filter((user: IUser) => {
          return user.points !== this.authService.getUser().points ||
            user.subscribed_before !== this.authService.getUser().subscribed_before;
        }),
        map((user: IUser) => {
          this.authService.setUser(user);
        })
      )
      .subscribe();
  }

  public onPay(): void {
    this.router.navigate(['panel/pay']);
  }

  public get hasSubscription(): boolean {
    return (this.user.subscribed_before !== null) && (this.user.subscribed_before !== '');
  }

  public get notSubscribed(): boolean {
    return this.user.subscribed_before === null || this.user.subscribed_before === '';
  }
}
