import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { StandingsPerTeam } from '../../models/Standings/standings';
import {StandingsService} from '../../services/standings.service';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css']
})
export class StandingsComponent implements OnInit {
  // Refer to Template Variable 'confSelectDrop' from Component
  @ViewChild('confSelectDrop') confSelectDrop: ElementRef;

  // Array that contains all Standings
  private standingsAll: Array<StandingsPerTeam>;
  // Arrays that contains Standings by Conference -- This array corresponds to View Tables
  eastConferenceStandings: Array<StandingsPerTeam>;
  westConferenceStandings: Array<StandingsPerTeam>;

  constructor(private standingsService: StandingsService) {}

  ngOnInit() {
    this.standingsService.getTodayStandings()
      .subscribe(standings => {
        this.standingsAll = standings;
        this.eastConferenceStandings = this.filterStandingsResults('East');
        this.westConferenceStandings = this.filterStandingsResults('West');
      });
  }

  onConferenceSelect(event: Event) {
    const elm: Element = (event.target as Element);
    const selectedConference = elm.innerHTML;
    this.confSelectDrop.nativeElement.innerHTML = ` ${selectedConference} `;

    this.changeViewTablesByConference(selectedConference.trim());
  }

  filterStandingsResults(selectedConf: string): Array<StandingsPerTeam> {
    return this.standingsAll ? this.standingsAll.filter(standingPerTeam => standingPerTeam.conference === selectedConf) : [];
  }

  changeViewTablesByConference(selectedConf: string) {
    this.eastConferenceStandings = this.filterStandingsResults('East');
    this.westConferenceStandings = this.filterStandingsResults('West');

    if (selectedConf === 'East') {
      this.westConferenceStandings.splice(0);
    }
    else if (selectedConf === 'West') {
      this.eastConferenceStandings.splice(0);
    }
  }
}
