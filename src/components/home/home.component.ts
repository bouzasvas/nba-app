import { Component, OnInit } from '@angular/core';
import {LeagueLeaders} from '../../models/LeagueLeaders/league-leaders';
import {LeagueLeadersService} from '../../services/league-leaders.service';
import {LoaderService} from '../../services/loader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  leagueLeaders: LeagueLeaders;

  constructor(private leagueLeadersService: LeagueLeadersService, private loader: LoaderService) { }

  ngOnInit() {
    this.getLeagueLeaders();
  }

  getLeagueLeaders() {
    this.loader.toggleLoader();

    this.leagueLeadersService
      .getLeagueLeaders('2018-19')
      .subscribe(res => {
        this.leagueLeaders = res;
        console.log(this.leagueLeaders);

        this.loader.toggleLoader();
      });
  }
}
