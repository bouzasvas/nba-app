import {Injectable} from '@angular/core';
import {LoggerService} from './logger.service';
import {Observable, of} from 'rxjs';
import {YoutubeApiSearchResults} from '../models/YoutubeApi/youtube-api-search-results';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {YoutubeApiMapper} from '../models/YoutubeApi/youtube-api-mapper';

import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class YoutubeApiService {

  private youtubeApiKey = environment.youtubeApiKey;

  private baseYoutubeApiUrl = 'https://www.googleapis.com/youtube/v3';
  private searchOperationUrl = (searchTerm) => `/search?part=snippet&q=${searchTerm}&type=video&key=${this.youtubeApiKey}`;

  constructor(private http: HttpClient, private logger: LoggerService, private youtubeApiMapper: YoutubeApiMapper) {
  }

  getVideosBySearchTerm(searchTerm: string): Observable<Array<YoutubeApiSearchResults>> {
    const endpointUrl = this.baseYoutubeApiUrl + this.searchOperationUrl(searchTerm);

    // If Youtube API Key is not defined (dev) return an observable of empty array
    if (!this.youtubeApiKey) {
      this.logger.warn('Videos not Retrieved because API Key is missing');
      return of([]);
    }

    return this.http
      .get(endpointUrl)
      .pipe(
        map(response => this.youtubeApiMapper.mapYoutubeVideoSearchResultsToModel(response)),
        tap(_ => this.logger.log(`Successfully Retrieved Youtube videos with Search Term ${searchTerm}`))
      );
  }
}
