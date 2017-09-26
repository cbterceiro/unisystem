import { Component } from '@angular/core';

import { AuthenticationService } from '../../authentication';

@Component({
  selector: 'uns-left-panel',
  templateUrl: 'left-panel.component.html',
  styleUrls: ['left-panel.component.css']
})
export class LeftPanelComponent {

  constructor(
    private authenticationService: AuthenticationService,
  ) { }

  logout(): void {
    this.authenticationService.logout();
  }
}
