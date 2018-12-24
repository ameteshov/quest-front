import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { IUser } from '../../../../interfaces/IUser';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  public user: IUser;
  constructor(
    private auth: AuthService
  ) {
    this.user = this.auth.getUser();
  }

  ngOnInit() {
  }

}
