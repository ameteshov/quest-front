import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { ModalEventsService } from '../../../../services/modal-events.service';

@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.css']
})
export class SubHeaderComponent implements OnInit {
  public isModalOpen: boolean;
  constructor(
    private auth: AuthService,
    private modalEventService: ModalEventsService
  ) {
    this.modalEventService
      .emitter
      .subscribe((event: string) => {
        this.isModalOpen = event === 'open';
      });
  }

  ngOnInit() {
  }

  public logout(): void {
    this.auth.logout();
  }

}
