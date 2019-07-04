import {Component, Input, OnInit} from '@angular/core';
import {LoaderService} from '../../services/loader.service';
import {YoutubeApiService} from '../../services/youtube-api.service';
import {YoutubeApiSearchResults} from '../../models/YoutubeApi/youtube-api-search-results';

import * as moment from 'moment';
import {YoutubeApiMapper} from '../../models/YoutubeApi/youtube-api-mapper';

@Component({
  selector: 'app-game-highlights',
  templateUrl: './game-highlights.component.html',
  styleUrls: ['./game-highlights.component.css']
})
export class GameHighlightsComponent implements OnInit {

  @Input() homeTeam: string;
  @Input() awayTeam: string;
  @Input() gameDate: string;

  gameHighlights: Array<YoutubeApiSearchResults>;

  constructor(private loader: LoaderService, private youtubeApi: YoutubeApiService, private youtubeApiMapper: YoutubeApiMapper) { }

  ngOnInit() {
    this.getGameHighlights();
  }

  private getGameHighlights(): void {
    const searchTerm = this.constructSearchTerm();

    this.loader.toggleLoader();
    this.youtubeApi
      .getVideosBySearchTerm(searchTerm)
      .subscribe(youtubeVideos => {
        this.gameHighlights = youtubeVideos.filter(video => this.youtubeApiMapper.filterYoutubeVideosBasedOnTitleAndGameDetails(video, searchTerm));

        this.loader.toggleLoader();
      });
  }

  private constructSearchTerm() {
    const gameDateMomentOb = moment(Number.parseFloat(this.gameDate));
    const formattedGameDateStr = gameDateMomentOb.format('MMMM D, YYYY');

    return `${this.awayTeam} vs ${this.homeTeam} ${formattedGameDateStr}`;
  }
}
