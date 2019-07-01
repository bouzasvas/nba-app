import {PointsLeader} from './points-leader';
import {ReboundsLeader} from './rebounds-leader';
import {AssistsLeader} from './assists-leader';
import {StealsLeader} from './steals-leader';
import {FgPercentageLeader} from './fg-percentage-leader';
import {FtPercentageLeader} from './ft-percentage-leader';
import {Fg3PercentageLeader} from './fg3-percentage-leader';
import {BlocksLeader} from './blocks-leader';

export interface LeagueLeaders {
  pointsLeaders: Array<PointsLeader>;
  reboundsLeaders: Array<ReboundsLeader>;
  assistsLeaders: Array<AssistsLeader>;
  stealsLeaders: Array<StealsLeader>;
  fgPercentageLeaders: Array<FgPercentageLeader>;
  ftPercentageLeaders: Array<FtPercentageLeader>;
  fg3PercentageLeaders: Array<Fg3PercentageLeader>;
  blocksLeaders: Array<BlocksLeader>;
}
