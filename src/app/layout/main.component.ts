import { Component, OnInit } from '@angular/core';

import { Message } from 'primeng/primeng';

import { AuthenticationService } from '../authentication';

import { MessageService } from '../core';

@Component({
  selector: 'uns-main',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.css']
})
export class MainComponent implements OnInit {

  msgs: Message[] = [];

  constructor(
    private authenticationService: AuthenticationService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.messageService.listen().subscribe(message => {
      this.msgs.push(message);
    });
  }
}
