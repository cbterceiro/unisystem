import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../authentication';

@Component({
  selector: 'uns-leftpanel',
  templateUrl: 'leftpanel.component.html',
  styleUrls: ['leftpanel.component.css']
})
export class LeftpanelComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() { }

  logout(): void {
    this.authenticationService.logout();
  }
}
