import {Team} from '../models/Team/team';

import * as _ from 'lodash';

export class CommonMapperFns {

  public static getRightObjectArray(ob: any, filterTerm: string, extraFilters?: boolean, filters?: Array<any>): Array<any> {
    const filteredResultSet = ob.resultSets
      .filter(o => o.name === filterTerm)
      .reduce(results => _.first(results));

    let rowset = filteredResultSet.rowSet;

    // Perform extra filtering if needed
    if (extraFilters) {
      const filteredRowset = [];

      filters.forEach((filterOb) => {
        filteredRowset.push(rowset.filter(row => row[filterOb.index] === filterOb.value));
      });

      // rowset = _.first(filteredRowset);
      rowset = filteredRowset;
    }

    return rowset;
  }

  public static getTeamsInfo(responseObject: any, scoreboardItem: any): Array<Team> {
    const linescoreObject = this.getRightObjectArray(responseObject, 'LineScore');
    const homeTeamLinescoreOb = linescoreObject
      .filter(ob => ob[3] === scoreboardItem[6])
      .reduce(team => _.first(team));
    const awayTeamLinescoreOb = linescoreObject
      .filter(ob => ob[3] === scoreboardItem[7])
      .reduce(team => _.first(team));

    const homeTeam: Team = {
      id: homeTeamLinescoreOb[3],
      teamName: homeTeamLinescoreOb[6],
      teamCity: homeTeamLinescoreOb[5],
      fullName: `${homeTeamLinescoreOb[5]} ${homeTeamLinescoreOb[6]}`,
      teamLogoPath: `assets/nba-teams-logo/${homeTeamLinescoreOb[6]}.gif`,
      pointsScored: homeTeamLinescoreOb[22]
    };

    const awayTeam: Team = {
      id: awayTeamLinescoreOb[3],
      teamName: awayTeamLinescoreOb[6],
      teamCity: awayTeamLinescoreOb[5],
      fullName: `${awayTeamLinescoreOb[5]} ${awayTeamLinescoreOb[6]}`,
      teamLogoPath: `assets/nba-teams-logo/${awayTeamLinescoreOb[6]}.gif`,
      pointsScored: awayTeamLinescoreOb[22]
    };

    return [homeTeam, awayTeam];
  }

  public static getTeamById(responseObject: any, id: number): Team {
    const linescoreObject = this.getRightObjectArray(responseObject, 'LineScore');
    const teamObject = linescoreObject
      .filter(ob => ob[3] === id)
      .reduce(t => _.first(t));

    const team: Team = {
      id: teamObject[3],
      teamName: teamObject[6],
      teamCity: teamObject[5],
      fullName: `${teamObject[5]} ${teamObject[6]}`,
      teamLogoPath: `assets/nba-teams-logo/${teamObject[6]}.gif`,
      pointsScored: teamObject[22]
    };

    return team;
  }
}
