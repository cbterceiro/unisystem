import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthenticationGuard implements CanActivateChild {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
  ) { }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isAuthenticated = this.authenticationService.isAuthenticated;
    if (!isAuthenticated) {
      this.router.navigate(['login']);
    }
    return isAuthenticated;
  }
}
