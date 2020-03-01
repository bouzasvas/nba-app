import {Scoreboard} from './scoreboard';
import {Team} from '../Team/team';
import {IdTeamEnum} from '../Team/id-team-enum.enum';

// Lodash
import * as _ from 'lodash';

// Utils Library
import {Utils} from '../../common/utils';

import {CommonMapperFns} from '../../common/common-mapper-fns';

export class ScoreboardMapper {

  static mapToModel(ob: any): Array<Scoreboard> {
    const transformedScoreboardArray = CommonMapperFns.getRightObjectArray(ob, 'GameHeader');

    const scoreboardArray: Array<Scoreboard> = [];

    transformedScoreboardArray.forEach(gameScoreboardNative => {
      const scoreboard = {} as Scoreboard;

      // Teams Array --> 0 item is Home Team, 1 item is Away Team
      const teams: Array<Team> = CommonMapperFns.getTeamsInfo(ob, gameScoreboardNative);
      const homeTeam: Team = teams[0];
      const awayTeam: Team = teams[1];

      scoreboard.GameSeq = gameScoreboardNative[1];
      scoreboard.GameId = gameScoreboardNative[2];
      scoreboard.GameStatus = Utils.convertToCurrentTimezone(gameScoreboardNative[4]);
      scoreboard.HomeTeam = homeTeam;
      scoreboard.AwayTeam = awayTeam;
      scoreboard.ArenaName = gameScoreboardNative[15];

      scoreboardArray.push(scoreboard);
    });

    return scoreboardArray;
  }
}
