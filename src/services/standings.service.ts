import { Injectable } from '@angular/core';
import {AppConstants} from '../app-constants';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StandingsPerTeam} from '../models/Standings/standings';
import {map} from 'rxjs/operators';
import {StandingsMapper} from '../models/Standings/standings-mapper';

@Injectable({
  providedIn: 'root'
})
export class StandingsService {

  private serviceEndpoint = `${AppConstants.baseNbaApiUrl}/leaguestandings`;

  constructor(private http: HttpClient) { }

  getTodayStandings(): Observable<Array<StandingsPerTeam>> {
    const endpoint = `${this.serviceEndpoint}?LeagueID=00&Season=2018-19&SeasonType=Regular+Season`;

    return this.http
      .get<Array<StandingsPerTeam>>(endpoint)
      .pipe(
        // TODO: Handle Error
        map(response => StandingsMapper.mapResponseToStandingsArray(response))
      );
  }

  getStandingsBySeasonYearAndType(year: string, type = 'Regular Season'): Observable<Array<StandingsPerTeam>> {
    const serviceEndpointParams: HttpParams = new HttpParams();
    serviceEndpointParams
      .set('LeagueID', '00')
      .set('Season', year)
      .set('SeasonType', type);

    return this.http
      .get<Array<StandingsPerTeam>>(this.serviceEndpoint, {params: serviceEndpointParams})
      .pipe(
        map(response => StandingsMapper.mapResponseToStandingsArray(response))
      );
  }
}
