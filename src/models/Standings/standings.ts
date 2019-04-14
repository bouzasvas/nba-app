import {Team} from '../Team/team';

export interface StandingsPerTeam {
  team: Team;
  conference: string;
  gamesTotal: number;
  gamesWin: number;
  gamesLoss: number;
  winPct: number;
  record: string;
  homeRecord: string;
  roadRecord: string;
  last10: string;
}
