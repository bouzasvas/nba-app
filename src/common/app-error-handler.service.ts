import {ErrorHandler, Injectable, Injector, NgZone} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {LoaderService} from '../services/loader.service';

@Injectable({
  providedIn: 'root'
})
export class AppErrorHandlerService implements ErrorHandler {

  constructor(private injector: Injector,
              private ngZone: NgZone,
              private loader: LoaderService) {
    // Inject Injector because ErrorHandler instantiates before the providers
  }

  handleError(error: any): void {
    const route = this.injector.get(Router);

    if (error instanceof HttpErrorResponse) {
      this.loader.toggleLoader();
      this.ngZone.run(() => route.navigate(['/error', {data: 'test'}]));
    }

    // console.error(error);
  }
}
