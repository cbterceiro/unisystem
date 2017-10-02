import { NgModule } from '@angular/core';

import { SessionService } from './session.service';
import { HttpClientService } from './http-client.service';
import { MessageService } from './message.service';

@NgModule({
  providers: [
    SessionService,
    HttpClientService,
    MessageService,
  ],
})
export class CoreModule { }
