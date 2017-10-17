import { Injectable, Injector, ErrorHandler as AngularErrorHandler } from '@angular/core';

import { MessageService } from './message.service';

@Injectable()
export class ErrorHandler implements AngularErrorHandler {

  constructor(
    private injector: Injector,
    private messageService: MessageService,
  ) { }

  handleError(error: any) {
    if (this.isBackendError(error)) {
      this.messageService.sendError({ detail: error.json().msg });
    }
    console.error(error);
  }

  isBackendError(error: any): boolean {
    return error.status >= 300 && error.url && !error.ok;
  }
}
