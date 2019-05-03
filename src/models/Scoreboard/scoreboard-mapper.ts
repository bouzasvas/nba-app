import {Scoreboard} from './scoreboard';
import {Team} from '../Team/team';
import {IdTeamEnum} from '../Team/id-team-enum.enum';

// Lodash
import * as _ from 'lodash';

export class ScoreboardMapper {

  static mapToModel(ob: any): Array<Scoreboard> {
    const transformedScoreboardArray = this.getRightObjectArray(ob);

    const scoreboardArray: Array<Scoreboard> = [];

    transformedScoreboardArray.forEach(gameScoreboardNative => {
      const scoreboard = {} as Scoreboard;

      // Teams Array --> 0 item is Home Team, 1 item is Away Team
      const teams: Array<Team> = this.getTeamsInfo(ob, gameScoreboardNative);
      const homeTeam: Team = teams[0];
      const awayTeam: Team = teams[1];

      scoreboard.GameSeq = gameScoreboardNative[1];
      scoreboard.GameId = gameScoreboardNative[2];
      scoreboard.GameStatus = gameScoreboardNative[4];
      scoreboard.HomeTeam = homeTeam;
      scoreboard.AwayTeam = awayTeam;
      scoreboard.ArenaName = gameScoreboardNative[15];

      scoreboardArray.push(scoreboard);
    });

    return scoreboardArray;
  }

  private static getRightObjectArray(ob: any, filterTerm = 'GameHeader'): Array<any> {
    const filteredResultSet = ob.resultSets
      .filter(o => o.name === filterTerm)
      .reduce(results => _.first(results));

    return filteredResultSet.rowSet;
  }

  private static getTeamsInfo(responseObject: any, scoreboardItem: any): Array<Team> {
    const linescoreObject = this.getRightObjectArray(responseObject, 'LineScore');
    const homeTeamLinescoreOb = linescoreObject
      .filter(ob => ob[3] === scoreboardItem[6])
      .reduce(team => _.first(team));
    const awayTeamLinescoreOb = linescoreObject
      .filter(ob => ob[3] === scoreboardItem[7])
      .reduce(team => _.first(team));

    const homeTeam: Team = {
      id: homeTeamLinescoreOb[3],
      teamName: homeTeamLinescoreOb[5],
      teamCity: homeTeamLinescoreOb[6],
      fullName: `${homeTeamLinescoreOb[5]} ${homeTeamLinescoreOb[6]}`
    };

    const awayTeam: Team = {
      id: awayTeamLinescoreOb[3],
      teamName: awayTeamLinescoreOb[5],
      teamCity: awayTeamLinescoreOb[6],
      fullName: `${awayTeamLinescoreOb[5]} ${awayTeamLinescoreOb[6]}`
    };

    return [homeTeam, awayTeam];
  }
}
