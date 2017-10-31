import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { Message } from 'primeng/primeng';

import { AuthenticationService } from '../authentication';

import { MessageService } from '../core';

@Component({
  selector: 'uns-main',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  msgs: Message[] = [];
  msgSubscription: Subscription;

  constructor(
    private authenticationService: AuthenticationService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.msgSubscription = this.messageService.listen().subscribe(message => {
      this.msgs = [...this.msgs, message];
    });
  }

  ngOnDestroy() {
    if (this.msgSubscription) {
      this.msgSubscription.unsubscribe();
    }
  }
}
