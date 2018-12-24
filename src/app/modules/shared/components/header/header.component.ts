import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isOpen: boolean;
  constructor() {
    this.isOpen = false;
  }

  ngOnInit() {
  }

  public toggle(): void {
    this.isOpen = !this.isOpen;
  }

}
