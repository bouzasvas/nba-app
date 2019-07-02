import {LeagueLeaders} from './league-leaders';
import {CommonMapperFns} from '../../common/common-mapper-fns';
import {LeagueLeadersCategories} from './league-leaders-categories.enum';
import {CategoryGeneric} from './category-generic';

export class LeagueLeadersMapper {

  public static convertLeagueLeadersResponsesToModel(response: any): LeagueLeaders {
    const leagueLeaders = {} as LeagueLeaders;

    const requestPlayerOrTeamParam = response.parameters.PlayerOrTeam;

    const pointsLeadersResponse = CommonMapperFns.getRightObjectArray(response, LeagueLeadersCategories.PointsLeaders);
    const reboundsLeadersResponse = CommonMapperFns.getRightObjectArray(response, LeagueLeadersCategories.ReboundsLeaders);
    const assistsLeadersResponse = CommonMapperFns.getRightObjectArray(response, LeagueLeadersCategories.AssistsLeaders);
    const stealsLeadersResponse = CommonMapperFns.getRightObjectArray(response, LeagueLeadersCategories.StealsLeaders);
    const fgPctLeadersResponse = CommonMapperFns.getRightObjectArray(response, LeagueLeadersCategories.FgPctLeaders);
    const ftPctLeadersResponse = CommonMapperFns.getRightObjectArray(response, LeagueLeadersCategories.FtPctLeaders);
    const fg3PctLeadersResponse = CommonMapperFns.getRightObjectArray(response, LeagueLeadersCategories.Fg3PctLeaders);
    const blocksLeadersResponse = CommonMapperFns.getRightObjectArray(response, LeagueLeadersCategories.BlocksLeaders);

    leagueLeaders.pointsLeaders = this.convertResponseObjectsToModels(requestPlayerOrTeamParam, pointsLeadersResponse);
    leagueLeaders.reboundsLeaders = this.convertResponseObjectsToModels(requestPlayerOrTeamParam, reboundsLeadersResponse);
    leagueLeaders.assistsLeaders = this.convertResponseObjectsToModels(requestPlayerOrTeamParam, assistsLeadersResponse);
    leagueLeaders.stealsLeaders = this.convertResponseObjectsToModels(requestPlayerOrTeamParam, stealsLeadersResponse);
    leagueLeaders.fgPercentageLeaders = this.convertResponseObjectsToModels(requestPlayerOrTeamParam, fgPctLeadersResponse);
    leagueLeaders.ftPercentageLeaders = this.convertResponseObjectsToModels(requestPlayerOrTeamParam, ftPctLeadersResponse);
    leagueLeaders.fg3PercentageLeaders = this.convertResponseObjectsToModels(requestPlayerOrTeamParam, fg3PctLeadersResponse);
    leagueLeaders.blocksLeaders = this.convertResponseObjectsToModels(requestPlayerOrTeamParam, blocksLeadersResponse);

    return leagueLeaders;
  }

  private static convertResponseObjectsToModels(playerOrTeam: string, response: any): Array<CategoryGeneric> {
    const convertedModelArray: Array<CategoryGeneric> = new Array<CategoryGeneric>();
    const player = (playerOrTeam === 'Player');

    response.forEach(el => {
      const obj = {} as CategoryGeneric;

      if (player) {
        obj.rank = el[0];
        obj.playerId = el[1];
        obj.player = el[2];
        obj.teamId = el[3];
        obj.teamAbbr = el[4];
        obj.teamName = el[5];
        obj.jerseyNum = el[6];
        obj.playerPosition = el[7];
        obj.categoryStat = el[8];
      } else {
        obj.rank = el[0];
        obj.teamId = el[1];
        obj.teamAbbr = el[2];
        obj.teamName = el[3];
        obj.categoryStat = el[4];
      }

      convertedModelArray.push(obj);
    });

    return convertedModelArray;
  }
}
