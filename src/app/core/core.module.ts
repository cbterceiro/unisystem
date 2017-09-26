import { NgModule } from '@angular/core';

import { SessionService } from './session.service';
import { HttpClientService } from './http-client.service';

@NgModule({
  providers: [
    SessionService,
    HttpClientService,
  ],
})
export class CoreModule { }
