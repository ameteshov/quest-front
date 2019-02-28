import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireEventsService {
  public emitter: EventEmitter<string>;

  public constructor() {
    this.emitter = new EventEmitter<string>();
  }

  public emit(event: string): void {
    this.emitter.emit(event);
  }
}
