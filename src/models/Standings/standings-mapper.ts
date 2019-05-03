import {StandingsPerTeam} from './standings';
import {Scoreboard} from '../Scoreboard/scoreboard';
import {Team} from '../Team/team';
import {IdTeamEnum} from '../Team/id-team-enum.enum';

export class StandingsMapper {

  static mapResponseToStandingsArray(response: any): Array<StandingsPerTeam> {
    const standingsResponse = response.resultSets[0].rowSet;
    const standingsArray: Array<StandingsPerTeam> = [];

    standingsResponse.forEach(teamStanding => {
      const standing = {} as StandingsPerTeam;

      const team: Team = {
        id: teamStanding[2],
        teamCity: teamStanding[3],
        teamName: teamStanding[4],
        fullName: `${teamStanding[3]} ${teamStanding[4]}`,
        teamLogoPath: `assets/nba-teams-logo/${teamStanding[4]}.gif`,
        pointsScored: 0
      };
      standing.team = team;
      standing.conference = teamStanding[5];
      standing.gamesWin = teamStanding[12];
      standing.gamesLoss = teamStanding[13];
      standing.gamesTotal = standing.gamesWin + standing.gamesLoss;
      standing.winPct = teamStanding[14];
      standing.record = teamStanding[16];
      standing.homeRecord = teamStanding[17];
      standing.roadRecord = teamStanding[18];
      standing.last10 = teamStanding[19];

      standingsArray.push(standing);
    });

    return standingsArray;
  }
}
