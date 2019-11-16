import {Injectable} from '@angular/core';
import {LoggerService} from './logger.service';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/internal/operators/tap';
import {LeagueLeaders} from '../models/LeagueLeaders/league-leaders';
import {map} from 'rxjs/operators';
import {LeagueLeadersMapper} from '../models/LeagueLeaders/league-leaders-mapper';
import {AppConstants} from '../common/app-constants';
import {BaseCallerService} from './base-caller.service';

@Injectable({
  providedIn: 'root'
})
export class LeagueLeadersService {

  private serviceEndpointUrl = (playerOrTeam, season, seasonType) => `${AppConstants.baseNbaApiUrl}/homepagev2?GameScope=Season&LeagueID=00&PlayerOrTeam=${playerOrTeam}&PlayerScope=All+Players&StatType=Traditional&Season=${season}&SeasonType=${seasonType}`;

  constructor(private logger: LoggerService, private api: BaseCallerService) {
  }

  getLeagueLeaders(season: string, playerOrTeam = 'Player', seasonType = 'Regular+Season'): Observable<LeagueLeaders> {
    const url = this.serviceEndpointUrl(playerOrTeam, season, seasonType);

    return this.api
      .apiCall<LeagueLeaders>(url)
      .pipe(
        map(response => LeagueLeadersMapper.convertLeagueLeadersResponsesToModel(response)),
        tap(_ => this.logger.log(`Successfully retrieved League Leaders for Season ${season} & Season Type ${seasonType}`))
      );
  }
}
