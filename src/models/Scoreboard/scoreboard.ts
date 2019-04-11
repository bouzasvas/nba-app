import {Team} from '../Team/team';

export interface Scoreboard {
  GameSeq: number;
  GameId: string;
  GameStatus?: string;
  HomeTeam: Team;
  AwayTeam: Team;
  ArenaName: string;
}
