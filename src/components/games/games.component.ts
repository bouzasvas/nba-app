import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {MatDatepicker} from '@angular/material';

import {LoaderService} from '../../services/loader.service';
import {ScoreboardService} from '../../services/scoreboard.service';
import {Scoreboard} from '../../models/Scoreboard/scoreboard';

// JQuery
declare var $: any;
// Moment
import * as moment from 'moment';
import {Moment} from 'moment';


@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  @ViewChild('gameDate') gameCalendar: MatDatepicker<Date>;
  selectedDate = new Date();

  scoreboard: Array<Scoreboard>;

  constructor(private loader: LoaderService, private scoreboardService: ScoreboardService) {
  }

  ngOnInit() {
    // Enable tooltips
    $(() => {
      $('[data-toggle="tooltip"]').tooltip();
    });

    // Set selectedDate to today
    this.gameCalendar.select(new Date());
    this.selectedDate = new Date();

    // In order to call WebService
    this.getScoreboardData(moment(this.selectedDate));
  }

  changeDate(how: number) {
    // In order to work anchor href attribute
    event.preventDefault();

    const dateInCalendar: Date = this.gameCalendar._selected;
    const dateInCalendarMomentOb = moment(dateInCalendar);

    if (how === -1) {
      // go to previous day
      dateInCalendarMomentOb.add(-1, 'day');
    } else if (how === 1) {
      // go to next day
      dateInCalendarMomentOb.add(1, 'day');
    } else {
      // Web Service call
      this.getScoreboardData(dateInCalendarMomentOb);
    }
    this.selectedDate = dateInCalendarMomentOb.toDate();
    // @ts-ignore
    this.gameCalendar.select(dateInCalendarMomentOb);
  }

  private getScoreboardData(momentDate: Moment) {
    const date = momentDate.format('MM/DD/YYYY');

    this.loader.toggleLoader();
    this.scoreboardService.getScoreboardData(date).subscribe(scoreboardArray => {
      this.scoreboard = scoreboardArray;
      this.loader.toggleLoader();
    });
  }


  @HostListener('window:keyup', ['$event'])
  private keyEvent(e: KeyboardEvent) {
    e.preventDefault();

    if (e.code === 'ArrowLeft') {
      this.changeDate(-1);
    } else if (e.code === 'ArrowRight') {
      this.changeDate(1);
    }
  }
}
