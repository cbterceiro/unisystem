import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../authentication';

@Component({
  selector: 'uns-main',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.css']
})
export class MainComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {

  }
}
