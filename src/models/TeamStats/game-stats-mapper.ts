import {TeamStats} from './team-stats';
import {PointsPerQuarter} from './points-per-quarter';
import {OtherTeamStats} from './other-team-stats';

import * as _ from 'lodash';
import {GameStats} from './game-stats';
import {CommonMapperFns} from '../../common/common-mapper-fns';

export class GameStatsMapper {

  public static convertResponsesToTeamStatsObject(boxscoreSummaryResponse: any, boxscoreTraditionalResponse: any): GameStats {
    const gameStats = {} as GameStats;

    const gameSummaryResponseObject = CommonMapperFns.getRightObjectArray(boxscoreSummaryResponse, 'GameSummary', false)[0];
    const homeTeamId = gameSummaryResponseObject[6];
    const awayTeamId = gameSummaryResponseObject[7];

    gameStats.homeTeamStats = this.constructTeamStatsObject(homeTeamId, boxscoreSummaryResponse, boxscoreTraditionalResponse);
    gameStats.awayTeamStats = this.constructTeamStatsObject(awayTeamId, boxscoreSummaryResponse, boxscoreTraditionalResponse);

    return gameStats;
  }

  private static convertBoxscoreSummaryResponseToModelByTeamId(teamId: number, boxscoreSumOb: any): [PointsPerQuarter, OtherTeamStats] {
    const ptsPerQtrResponse = CommonMapperFns.getRightObjectArray(boxscoreSumOb, 'LineScore', true, [{index: 3, value: teamId}])[0];
    const otherStatsResponse = CommonMapperFns.getRightObjectArray(boxscoreSumOb, 'OtherStats', true, [{index: 1, value: teamId}])[0];

    const ptsPerQtr: PointsPerQuarter = this.constructPtsPerQtrObject(ptsPerQtrResponse);
    const otherStats: OtherTeamStats = this.constructOtherStatsObject(otherStatsResponse);

    return [ptsPerQtr, otherStats];
  }

  private static constructTeamStatsObject(teamId: number, boxscoresummaryResponse: any, boxscoreTraditionalResponse: any) {
    const teamStats = {} as TeamStats;

    const team = CommonMapperFns.getTeamById(boxscoresummaryResponse, teamId);
    teamStats.team = team;

    const ptsPerQtrOtherStatsArray = this.convertBoxscoreSummaryResponseToModelByTeamId(teamId, boxscoresummaryResponse);
    teamStats.pointsPerQuarter = ptsPerQtrOtherStatsArray[0];
    teamStats.otherTeamStats = ptsPerQtrOtherStatsArray[1];

    const teamStatsResponseObject = CommonMapperFns.getRightObjectArray(boxscoreTraditionalResponse, 'TeamStats', true, [{index: 1, value: teamId}])[0];
    teamStats.minutes = teamStatsResponseObject[5];
    teamStats.fgMade = teamStatsResponseObject[6];
    teamStats.fgAttempted = teamStatsResponseObject[7];
    teamStats.fgPct = teamStatsResponseObject[8];
    teamStats.f3gMade = teamStatsResponseObject[9];
    teamStats.fg3Attempted = teamStatsResponseObject[10];
    teamStats.fg3Pct = teamStatsResponseObject[11];
    teamStats.ftMade = teamStatsResponseObject[12];
    teamStats.ftAttempted = teamStatsResponseObject[13];
    teamStats.ftPct = teamStatsResponseObject[14];
    teamStats.offensiveRebounds = teamStatsResponseObject[15];
    teamStats.defensiveRebounds = teamStatsResponseObject[16];
    teamStats.totalRebounds = teamStatsResponseObject[17];
    teamStats.assists = teamStatsResponseObject[18];
    teamStats.steals = teamStatsResponseObject[19];
    teamStats.blocks = teamStatsResponseObject[20];
    teamStats.turnovers = teamStatsResponseObject[21];
    teamStats.personalFouls = teamStatsResponseObject[22];
    teamStats.points = teamStatsResponseObject[23];

    return teamStats;
  }

  private static constructPtsPerQtrObject(response: any): PointsPerQuarter {
    const ptsPerQuarter = {} as PointsPerQuarter;

    ptsPerQuarter.qtr1 = response[8];
    ptsPerQuarter.qtr2 = response[9];
    ptsPerQuarter.qtr3 = response[10];
    ptsPerQuarter.qtr4 = response[11];

    // Get OT points and keep only non-zero values
    ptsPerQuarter.otQtrArray = response
      .slice(12, 22)
      .filter(otPts => otPts !== 0);

    ptsPerQuarter.total = response[22];

    return ptsPerQuarter;
  }

  private static constructOtherStatsObject(response: any): OtherTeamStats {
    const otherStats = {} as OtherTeamStats;

    otherStats.pointsInPaint = response[4];
    otherStats.secondChancePoints = response[5];
    otherStats.fastbreakPoints = response[6];

    return otherStats;
  }
}
