import {Scoreboard} from './scoreboard';
import {Team} from '../Team/team';
import {IdTeamEnum} from '../Team/id-team-enum.enum';

export class ScoreboardMapper {

  static mapToModel(ob: any): Array<Scoreboard> {
    const transformedScoreboardArray = this.getRightObjectArray(ob);

    const scoreboardArray: Array<Scoreboard> = [];

    transformedScoreboardArray.forEach(gameScoreboardNative => {
      const scoreboard = {} as Scoreboard;

      const homeTeam: Team = { id: gameScoreboardNative[6], name: IdTeamEnum['id' + gameScoreboardNative[6]] };
      const awayTeam: Team = { id: gameScoreboardNative[7], name: IdTeamEnum['id' + gameScoreboardNative[7]] };

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

  private static getRightObjectArray(ob: any): Array<any> {
    const filteredResultSet = ob.filter(o => o.name === 'Game Header');

    return filteredResultSet.rowSet;
  }
}
