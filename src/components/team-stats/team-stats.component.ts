import {Component, Input, OnInit} from '@angular/core';
import {GameStats} from '../../models/TeamStats/game-stats';

@Component({
  selector: 'app-team-stats',
  templateUrl: './team-stats.component.html',
  styleUrls: ['./team-stats.component.css']
})
export class TeamStatsComponent implements OnInit {

  @Input() gameStats: GameStats;

  constructor() { }

  ngOnInit() {
  }

}
