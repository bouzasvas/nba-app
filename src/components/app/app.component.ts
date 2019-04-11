import {Component, OnInit} from '@angular/core';
import {ScoreboardService} from '../../services/scoreboard.service';
import {Scoreboard} from '../../models/Scoreboard/scoreboard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'nba-app';

  scoreboard: Array<Scoreboard> = [];

  constructor(private scoreboardService: ScoreboardService) {}

  ngOnInit(): void {
    this.scoreboardService.getScoreboardData('').subscribe(data => this.scoreboard = data);
  }
}
