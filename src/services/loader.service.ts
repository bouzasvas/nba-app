import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public loaderIsActivated = false;

  constructor() {
  }

  public toggleLoader() {
    this.loaderIsActivated = !this.loaderIsActivated;
  }

  public isOn(): boolean {
    return this.loaderIsActivated;
  }
}
