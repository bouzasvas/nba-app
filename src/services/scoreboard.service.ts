import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Scoreboard} from '../models/Scoreboard/scoreboard';
import {AppConstants} from '../common/app-constants';

import {HttpClient} from '@angular/common/http';
import {ScoreboardMapper} from '../models/Scoreboard/scoreboard-mapper';
import {map, tap} from 'rxjs/operators';
import {LoggerService} from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class ScoreboardService {

  private gameDate: string;
  private scoreboardApiUrl: string;

  constructor(private logger: LoggerService, private http: HttpClient) {
  }

  private updateEndpointUrl(gameDate: string) {
    this.scoreboardApiUrl = `${AppConstants.baseNbaApiUrl}/scoreboardV2?GameDate=${gameDate}&LeagueID=00&DayOffset=0`;
  }

  getScoreboardData(gameDate): Observable<Array<Scoreboard>> {
    this.updateEndpointUrl(gameDate);
    return this.http.get<Array<Scoreboard>>(this.scoreboardApiUrl)
      .pipe(
        tap(_ => this.logger.log('Retrieve Scoreboard Data successfully!')),
        map(scoreboardArray => ScoreboardMapper.mapToModel(scoreboardArray))
      );
  }
}
