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
    return Observable.of(true);
  }

  logout() {
    this.sessionService.clear();
    this.router.navigate(['login']);
  }

  get isAuthenticated() {
    return this.sessionService.hasItem(SessionKeys.user);
  }
}
