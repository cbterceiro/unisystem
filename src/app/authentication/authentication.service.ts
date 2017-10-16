import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { SessionService, SessionKeys, HttpClientService, SearchModel, Servidor } from '../core/';

@Injectable()
export class AuthenticationService {

  constructor(
    private httpClientService: HttpClientService,
    private sessionService: SessionService,
    private router: Router,
  ) { }

  login(email: string, password: string): Observable<boolean> {
    /*return this.httpClientService.search('/servidores/pesquisa', new SearchModel({
      fields: ['id'],
      filters: [`email like ${email}`],
    })).map(res => res.json().shift() || null);*/
    return Observable.of(true);
  }

  logout() {
    this.sessionService.clear();
    this.router.navigate(['login']);
  }

  getAuthenticatedUser(): Servidor {
    const servidor: Servidor = this.sessionService.getItem(SessionKeys.user);
    if (servidor) {
      servidor.dataNascimento = new Date(servidor.dataNascimento);
    }
    return servidor;
  }

  setAuthenticatedUser(user: Servidor) {
    this.sessionService.setItem(SessionKeys.user, user);
  }

  get isAuthenticated() {
    return this.sessionService.hasItem(SessionKeys.user);
  }
}
