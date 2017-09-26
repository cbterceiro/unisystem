import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { SessionService, SessionKeys } from '../core/';

@Injectable()
export class AuthenticationService {

  constructor(
    private sessionService: SessionService,
    private router: Router,
  ) { }

  login(username: string, password: string): boolean {
    //if (username === 'a' && password === 'a') {
    this.sessionService.setItem(SessionKeys.user, { username: username, password: password });
    return true;
    //}
    //return false;
  }

  logout() {
    this.sessionService.clear();
    this.router.navigate(['login']);
  }

  get isAuthenticated() {
    return this.sessionService.hasItem(SessionKeys.user);
  }
}
