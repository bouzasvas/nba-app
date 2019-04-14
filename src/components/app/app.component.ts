import {Component, OnInit} from '@angular/core';
import {ScoreboardService} from '../../services/scoreboard.service';
import {Scoreboard} from '../../models/Scoreboard/scoreboard';
import {LoaderService} from '../../services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private loader: LoaderService) {}

  ngOnInit(): void {}
}
