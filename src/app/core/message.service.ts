import { Injectable } from '@angular/core';

import { Subject, Observable } from 'rxjs';

import { Message } from 'primeng/primeng';

@Injectable()
export class MessageService {

  messages: Subject<Message> = new Subject<Message>();

  constructor() { }

  send(message: Message): void {
    this.messages.next(message);
  }

  sendSuccess(message: Message): void {
    message.severity = 'success';
    this.send(message);
  }

  sendInfo(message: Message): void {
    message.severity = 'info';
    this.send(message);
  }

  sendWarn(message: Message): void {
    message.severity = 'warn';
    this.send(message);
  }

  sendError(message: Message): void {
    message.severity = 'error';
    this.send(message);
  }

  listen(): Observable<Message> {
    return this.messages.asObservable();
  }
}
