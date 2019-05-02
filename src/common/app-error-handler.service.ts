import {ErrorHandler, Injectable} from '@angular/core';

@Injectable()
export class AppErrorHandlerService implements ErrorHandler {

  constructor() { }

  handleError(error: any): void {
    // TODO: Implemennt Error Handler
    console.error(error);
  }
}
