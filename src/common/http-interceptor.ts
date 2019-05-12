import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {LoggerService} from '../services/logger.service';
import {catchError} from 'rxjs/operators';
import {LoaderService} from '../services/loader.service';

export class AppHttpInterceptor implements HttpInterceptor {

  constructor(private appLogger: LoggerService, private loader: LoaderService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError(this.handleError())
      );
  }

  private handleError() {
    return (error: HttpErrorResponse): Observable<any> => {
      const errorMsg = `Status Code: ${error.status}, Message: ${error.message}`;
      this.appLogger.error('AppHttpInterceptor: HttpError', errorMsg);

      // Stop the loader
      this.loader.toggleLoader();

      // TODO: Check what we can return as observable value
      return throwError(errorMsg);
    };
  }
}
