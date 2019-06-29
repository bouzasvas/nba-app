import {PointsPerQuarter} from './points-per-quarter';
import {OtherTeamStats} from './other-team-stats';
import {Team} from '../Team/team';
import {Boxscore} from '../Boxscore/boxscore';

export interface TeamStats {
  team: Team;
  pointsPerQuarter: PointsPerQuarter;
  otherTeamStats: OtherTeamStats;
  boxscore: Boxscore;

  minutes: string;
  fgMade: number;
  fgAttempted: number;
  fgPct: number;
  fg3Made: number;
  fg3Attempted: number;
  fg3Pct: number;
  ftMade: number;
  ftAttempted: number;
  ftPct: number;
  offensiveRebounds: number;
  defensiveRebounds: number;
  totalRebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
  personalFouls: number;
  points: number;
}
