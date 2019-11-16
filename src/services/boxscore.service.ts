import {Injectable} from '@angular/core';
import {LoggerService} from './logger.service';
import {AppConstants} from '../common/app-constants';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {BaseCallerService} from './base-caller.service';

@Injectable({
  providedIn: 'root'
})
export class BoxscoreService {

  private boxscoreEndpointUrl = `${AppConstants.baseNbaApiUrl}//boxscoresummaryv2?GameID=`;
  private boxscoreTraditionalEndpointUrl = `${AppConstants.baseNbaApiUrl}/boxscoretraditionalv2?EndPeriod=1&EndRange=0&RangeType=0&StartPeriod=1&StartRange=0&GameID=`;

  constructor(private Logger: LoggerService, private api: BaseCallerService) { }

  getBoxscoreByGameId(gameId: string): Observable<any> {
    const endpointUrl = this.boxscoreEndpointUrl.concat(gameId);

    return this.api
      .apiCall<any>(endpointUrl)
      .pipe(tap(_ => this.Logger.log(`Successfully Retrieved Boxscore data for Game: ${gameId}`)));
  }

  getBoxscoreTraditionalByGameId(gameId: string): Observable<any> {
    const endpointUrl = this.boxscoreTraditionalEndpointUrl.concat(gameId);

    return this.api
      .apiCall<any>(endpointUrl)
      .pipe(tap(_ => this.Logger.log(`Successfully Retrieved Boxscore Traditional data for Game: ${gameId}`)));
  }
}
