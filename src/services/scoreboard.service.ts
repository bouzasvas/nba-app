import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Scoreboard} from '../models/Scoreboard/scoreboard';
import {AppConstants} from '../components/app/app-constants';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ScoreboardMapper} from '../models/Scoreboard/scoreboard-mapper';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScoreboardService {

  private httpOptions = {
    headers: new HttpHeaders({
      // 'Access-Control-Allow-Origin': 'http://localhost:4200',
      // 'Access-Control-Allow-Credentials': 'true'
      // 'Content-Type': 'text/plain'
      // 'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      // 'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
    }),
    // withCredentials: false
  };

  // GameDate has date format MM/DD/YYYY
  // private gameDate: string;

  // For Testing!!
  private gameDate = '02/14/2018';

  private scoreboardApiUrl = AppConstants.baseNbaApiUrl + `scoreboard?GameDate=${this.gameDate}&LeagueID=00&DayOffset=0`;

  constructor(private http: HttpClient) {
  }

  getScoreboardData(gameDate): Observable<Array<Scoreboard>> {
    return this.http.get<Array<Scoreboard>>(this.scoreboardApiUrl, this.httpOptions)
      .pipe(
        map(scoreboardArray => ScoreboardMapper.mapToModel(scoreboardArray))
      );
  }
}
