import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../authentication';

@Component({
  selector: 'uns-left-panel-profile',
  templateUrl: 'left-panel-profile.component.html',
  styleUrls: ['left-panel-profile.component.css']
})
export class LeftPanelProfileComponent implements OnInit {

  name: string;
  profileImageSource: string;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.name = this.authenticationService.getAuthenticatedUser().nome;
    this.profileImageSource = '/assets/img/default-user-icon.png';
  }

  showProfileModal(): void {
    this.router.navigate(['/profile', { show: true }], { skipLocationChange: true });
  }
}
