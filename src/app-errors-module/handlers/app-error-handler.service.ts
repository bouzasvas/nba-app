import {ErrorHandler, Injectable, Injector, NgZone} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {LoaderService} from '../../services/loader.service';
import {LoggerService} from '../../services/logger.service';
import {BaseError} from '../models/base-error';
import {AppErrorsModule} from '../app-errors.module';

@Injectable({
  providedIn: AppErrorsModule
})
export class AppErrorHandlerService implements ErrorHandler {

  private injectedDependencies: Map<string, any> = new Map<string, any>();
  private error: BaseError;

  constructor(private injector: Injector,
              private ngZone: NgZone,
              private logger: LoggerService,
              private loader: LoaderService) {
    // Inject Injector because ErrorHandler instantiates before the providers
  }

  handleError(error: any): void {
    this.injectRequiredDependencies();

    this.loader.toggleLoader();
    if (error instanceof HttpErrorResponse) {
      this.handleHttpErrors(error);
    }

    this.logger.error(this.error, this.error.name);
  }

  private handleHttpErrors(error: HttpErrorResponse) {
    const route: Router = this.injectedDependencies.get('router');

    // Construct Error object
    this.constructHttpErrorObject('HttpErrorResponse', error.status.toString(), error.message);

    // Redirect to Errors component Page
    this.ngZone.run(() => route.navigate(['/error'], {queryParams: this.error}));
  }

  private injectRequiredDependencies() {
    const route = this.injector.get(Router);
    this.injectedDependencies.set('router', route);
  }

  private constructHttpErrorObject(errorName: string, httpStatusCode: string, errorDescription: string) {
    this.error = {} as BaseError;

    this.error.name = errorName;
    this.error.httpStatusCode = httpStatusCode;
    this.error.description = errorDescription;
  }
}
