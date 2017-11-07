import { NgModule, ErrorHandler } from '@angular/core';

import { SessionService } from './services/session.service';
import { HttpClientService } from './services/http-client.service';
import { MessageService } from './services/message.service';
import { ServidorService } from './services/servidor.service';
import { NoticiaService } from './services/noticia.service';
import { ErrorHandler as MyErrorHandler } from './error-handler';

@NgModule({
  providers: [
    SessionService,
    HttpClientService,
    MessageService,
    ServidorService,
    NoticiaService,
    { provide: ErrorHandler, useClass: MyErrorHandler },
  ],
})
export class CoreModule { }
