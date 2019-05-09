import {PointsPerQuarter} from './points-per-quarter';
import {OtherTeamStats} from './other-team-stats';

export interface TeamStats {
  pointsPerQuarter: PointsPerQuarter;
  otherTeamStats: OtherTeamStats;

  minutes: string;
  fgMade: number;
  fgAttempted: number;
  fgPct: number;
  f3gMade: number;
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
