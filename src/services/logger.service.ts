import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }

  log(obj: any) {
    const msg = this.convertObjectToString(obj);
    console.log(`LoggerService: Info: ${msg}`);
  }

  warn(obj: any) {
    const msg = this.convertObjectToString(obj);
    console.warn(`LoggerService: Warn: ${msg}`);
  }

  error(obj: any, errorType = 'LoggerService: Error') {
    const msg = this.convertObjectToString(obj);
    console.error(`${errorType}: ${msg}`);
  }

  private convertObjectToString(ob: any): string {
    if (ob instanceof Object) {
      return JSON.stringify(ob);
    }
    else if (typeof ob === 'string') {
      return ob;
    }

  }
}
