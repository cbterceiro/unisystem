import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SessionService, SessionKeys } from '../../core';

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
    private sessionService: SessionService,
  ) { }

  ngOnInit() {
    this.name = this.sessionService.getItem(SessionKeys.user).username;
    this.profileImageSource = '/assets/img/default-user-icon.png';
  }

  showProfileModal(): void {
    this.router.navigate(['/profile', { show: true }], { skipLocationChange: true });
  }
}
