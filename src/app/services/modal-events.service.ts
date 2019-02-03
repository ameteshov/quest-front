import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalEventsService {
  public emitter: EventEmitter<string>;

  public constructor() {
    this.emitter = new EventEmitter<string>();
  }

  public emit(event: string): void {
    this.emitter.emit(event);
  }

  public onOpen(): void {
    this.emit('open');
  }

  public onClose(): void {
    this.emit('close');
  }
}
