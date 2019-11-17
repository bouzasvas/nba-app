import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseCallerService {

  constructor(private http: HttpClient) {
  }

  apiCall<T>(url: string): Observable<T> {
    let observableResponse: Observable<T>;

    const prod = environment.production;
    if (prod) {
      observableResponse = this.jsonpCall(url);
    } else {
      observableResponse = this.httpCall<T>(url);
    }

    return observableResponse;
  }

  private httpCall<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  private jsonpCall<T>(url: string): Observable<T> {
    return this.http.jsonp<T>(url, 'callback');
  }
}
