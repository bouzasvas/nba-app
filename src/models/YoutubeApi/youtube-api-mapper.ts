import {YoutubeApiSearchResults} from './youtube-api-search-results';
import {DomSanitizer} from '@angular/platform-browser';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class YoutubeApiMapper {

  constructor(private sanitizer: DomSanitizer) {}

  public mapYoutubeVideoSearchResultsToModel(response: any): Array<YoutubeApiSearchResults> {
    const youtubeSearchResults: Array<YoutubeApiSearchResults> = new Array<YoutubeApiSearchResults>();

    response.items.forEach(video => {
      const youtubeVideo = this.mapVideoItemToModel(video);

      youtubeSearchResults.push(youtubeVideo);
    });

    return youtubeSearchResults;
  }

  private mapVideoItemToModel(video: any): YoutubeApiSearchResults {
    const youtubeVideo = {} as YoutubeApiSearchResults;

    youtubeVideo.videoId = video.id.videoId;
    youtubeVideo.videoEmbedLink = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${youtubeVideo.videoId}`);

    youtubeVideo.videoTitle = video.snippet.title;
    youtubeVideo.videoDescription = video.snippet.description;
    youtubeVideo.videoThumbnailUrl = video.snippet.thumbnails.high.url;

    return youtubeVideo;
  }
}
