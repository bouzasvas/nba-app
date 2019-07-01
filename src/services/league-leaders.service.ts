import {Injectable} from '@angular/core';
import {LoggerService} from './logger.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/internal/operators/tap';
import {LeagueLeaders} from '../models/LeagueLeaders/league-leaders';
import {map} from 'rxjs/operators';
import {LeagueLeadersMapper} from '../models/LeagueLeaders/league-leaders-mapper';

@Injectable({
  providedIn: 'root'
})
export class LeagueLeadersService {

  private serviceEndpointUrl = (playerOrTeam, season, seasonType) => `https://stats.nba.com/stats/homepagev2?GameScope=Season&LeagueID=00&PlayerOrTeam=${playerOrTeam}&PlayerScope=All+Players&StatType=Traditional&Season=${season}&SeasonType=${seasonType}`;

  constructor(private logger: LoggerService, private http: HttpClient) { }

  getLeagueLeaders(season: string, playerOrTeam = 'Player', seasonType = 'Regular+Season'): Observable<LeagueLeaders> {
    const url = this.serviceEndpointUrl(playerOrTeam, season, seasonType);

    return this.http
      .get<LeagueLeaders>(url)
      .pipe(
        map(response => LeagueLeadersMapper.convertLeagueLeadersResponsesToModel(response)),
        tap(_ => this.logger.log(`Successfully retrieved League Leaders for Season ${season} & Season Type ${seasonType}`))
      );
  }
}
