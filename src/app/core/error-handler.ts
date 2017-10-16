import { Injectable, Injector, ErrorHandler as AngularErrorHandler, ApplicationRef } from '@angular/core';

import { MessageService } from './message.service';

@Injectable()
export class ErrorHandler implements AngularErrorHandler {

  constructor(
    private injector: Injector,
    private messageService: MessageService,
  ) { }

  get applicationRef(): ApplicationRef {
    return this.injector.get(ApplicationRef);
  }

  handleError(error: any) {
    if (this.isBackendError(error)) {
      this.messageService.sendError({ detail: error.json().msg });
    }
    console.error(error);
    //this.applicationRef.tick();
  }

  isBackendError(error: any): boolean {
    return error.status > 300 && error.url && !error.ok;
  }
}
