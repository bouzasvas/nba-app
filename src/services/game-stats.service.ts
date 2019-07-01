import { Injectable } from '@angular/core';
import {LoggerService} from './logger.service';
import {BoxscoreService} from './boxscore.service';
import {forkJoin, Observable} from 'rxjs';
import {GameStats} from '../models/TeamStats/game-stats';
import {map} from 'rxjs/operators';
import {GameStatsMapper} from '../models/TeamStats/game-stats-mapper';
import {tap} from 'rxjs/internal/operators/tap';

@Injectable({
  providedIn: 'root'
})
export class GameStatsService {

  constructor(private Logger: LoggerService, private boxscore: BoxscoreService) { }

  getGameStats(gameId: string): Observable<GameStats> {
    const boxscoreObservable = this.boxscore.getBoxscoreByGameId(gameId);
    const boxscoreTraditionalObservable = this.boxscore.getBoxscoreTraditionalByGameId(gameId);

    return forkJoin(boxscoreObservable, boxscoreTraditionalObservable)
      .pipe(
        map(responses => GameStatsMapper.convertResponsesToTeamStatsObject(responses[0], responses[1])),
        tap(_ => `Successfully finished all requests for game ${gameId} stats!`)
      );
  }
}
