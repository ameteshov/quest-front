import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../../../../services/user-api.service';
import { IUser } from '../../../../interfaces/IUser';
import { IApiResponse } from '../../../../interfaces/IApiResponse';
import { HttpErrorResponse } from '@angular/common/http';
import swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public users: Array<IUser>;

  constructor(
    private userService: UserApiService
  ) {
    this.users = [];
  }

  ngOnInit() {
    this.userService
      .search({ 'all': 1 })
      .subscribe(
        (response: IApiResponse) => {
          this.users = response.data;
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        });
  }

  public toggle(id: number): void {
    const index = this.users.findIndex(item => item.id === id);
    const isActive = !this.users[index].is_active;

    this.userService
      .update(id, { is_active: isActive })
      .subscribe((response: IApiResponse) => {
        this.users[index].is_active = isActive;
        swal('success', 'User updated', 'success');
      });
  }

}
