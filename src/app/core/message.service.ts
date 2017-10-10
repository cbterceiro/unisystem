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
    message.summary = message.summary || 'Sucesso';
    this.send(message);
  }

  sendInfo(message: Message): void {
    message.severity = 'info';
    message.summary = message.summary || 'Atenção';
    this.send(message);
  }

  sendWarn(message: Message): void {
    message.severity = 'warn';
    message.summary = message.summary || 'Atenção';
    this.send(message);
  }

  sendError(message: Message): void {
    message.severity = 'error';
    message.summary = message.summary || 'Erro';
    this.send(message);
  }

  listen(): Observable<Message> {
    return this.messages.asObservable();
  }
}
