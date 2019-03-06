import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { IUser } from '../../../../interfaces/IUser';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-panel-body',
  templateUrl: './panel-body.component.html',
  styleUrls: ['./panel-body.component.css']
})
export class PanelBodyComponent implements OnInit {
  showShop = false;
  showUser = false;
  showMenu = false;
  public user: IUser;

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
