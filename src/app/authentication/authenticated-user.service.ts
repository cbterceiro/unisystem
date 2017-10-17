import { Injectable } from '@angular/core';

import { Subject, Observable } from 'rxjs/Rx';

import { Servidor, SessionService, SessionKeys } from '../core/';

@Injectable()
export class AuthenticatedUserService {

  private servidor: Servidor;
  private servidorSubject: Subject<Servidor> = new Subject<Servidor>();

  constructor(
    private sessionService: SessionService,
  ) { }

  getServidor(): Servidor {
    if (!this.servidor) {
      this.servidor = this.sessionService.getItem(SessionKeys.user);
      if (this.servidor.dataNascimento) {
        this.servidor.dataNascimento = new Date(this.servidor.dataNascimento);
      }
    }
    return this.servidor;
  }

  setServidor(servidor: Servidor, options?: { emitEvent: boolean }): void {
    this.servidor = servidor;
    this.sessionService.setItem(SessionKeys.user, servidor);
    if (!options || options.emitEvent) {
      this.servidorSubject.next(servidor);
    }
  }

  updateServidor(servidor: Servidor, options?: { emitEvent: boolean }): void {
    Object.assign(this.servidor, servidor);
    this.sessionService.setItem(SessionKeys.user, servidor);
    if (!options || options.emitEvent) {
      this.servidorSubject.next(servidor);
    }
  }

  listen(): Observable<Servidor> {
    return this.servidorSubject.asObservable();
  }
}
