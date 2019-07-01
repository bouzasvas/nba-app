import {Component, Input, OnInit} from '@angular/core';
import {GameStats} from '../../models/TeamStats/game-stats';

declare var $: any;

@Component({
  selector: 'app-boxscore',
  templateUrl: './boxscore.component.html',
  styleUrls: ['./boxscore.component.css']
})
export class BoxscoreComponent implements OnInit {
  @Input() gameStats: GameStats;

  selectedTeam = 'Both Teams';

  constructor() { }

  ngOnInit() {
    this.enableTooltips();
  }

  selectTeam(evt: Event, selectedTeam: string): void {
    evt.preventDefault();
    this.selectedTeam = selectedTeam;
  }

  private enableTooltips(): void {
    $(() => {
      $('[data-toggle="tooltip"]').tooltip();
    });
  }
}
