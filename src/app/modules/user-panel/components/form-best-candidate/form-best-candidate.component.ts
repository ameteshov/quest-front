import { Component, OnInit, Input } from '@angular/core';
import { IQuestionnaire } from '../../../../interfaces/IQuestionnaire';

@Component({
  selector: 'app-form-best-candidate',
  templateUrl: './form-best-candidate.component.html',
  styleUrls: ['./form-best-candidate.component.css']
})
export class FormBestCandidateComponent implements OnInit {
  @Input() survey: IQuestionnaire;

  constructor() { }

  ngOnInit() {
  }

}
