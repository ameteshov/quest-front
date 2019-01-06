import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar-graph',
  templateUrl: './progress-bar-graph.component.html',
  styleUrls: ['./progress-bar-graph.component.css']
})
export class ProgressBarGraphComponent implements OnInit {
  @Input() percent: number;
  @Input() title: string;

  constructor() {
    this.percent = 0;
    this.title = '';
  }

  ngOnInit() {
  }

}
