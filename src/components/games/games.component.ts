import {Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  @ViewChild('fromDate') fromDate;
  @ViewChild('toDate') toDate;

  constructor() { }

  ngOnInit() { }

}
