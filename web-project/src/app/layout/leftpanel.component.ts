import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../authentication';

@Component({
  selector: 'uns-leftpanel',
  templateUrl: 'leftpanel.component.html',
  styleUrls: ['leftpanel.component.css']
})
export class LeftpanelComponent implements OnInit {

  name: string;

  constructor(
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.name = 'Nome do servidor público';
  }

  logout(): void {
    this.authenticationService.logout();
  }
}
