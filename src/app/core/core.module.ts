import { NgModule, ErrorHandler } from '@angular/core';

import { SessionService } from './session.service';
import { HttpClientService } from './http-client.service';
import { MessageService } from './message.service';
import { ErrorHandler as MyErrorHandler } from './error-handler';

@NgModule({
  providers: [
    SessionService,
    HttpClientService,
    MessageService,
    { provide: ErrorHandler, useClass: MyErrorHandler },
  ],
})
export class CoreModule { }
