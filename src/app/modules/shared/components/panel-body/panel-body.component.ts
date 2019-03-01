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
  showShop = false;
  showUser = false;
  showMenu = false;
  closeMiniModal() {
    this.showUser = false;
    this.showShop = false;
  }
  openShop(){
    this.showUser = false;
    this.showShop = !this.showShop;
    setTimeout(() => this.showShop = false, 5000)
  }
  openUser(){
    this.showShop = false;
    this.showUser = !this.showUser;
    setTimeout(() => this.showUser = false, 5000)
  }
  openMenu(){
    if(this.showMenu == false){
      document.body.style.overflow = "hidden"
    }
    if(this.showMenu == true){
      document.body.style.overflow = "auto"
    }
    this.showMenu = !this.showMenu;
  }
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
