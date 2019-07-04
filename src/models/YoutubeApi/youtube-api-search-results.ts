import {SafeResourceUrl} from '@angular/platform-browser';

export interface YoutubeApiSearchResults {
  videoId: string;
  videoEmbedLink: SafeResourceUrl;

  videoTitle: string;
  videoDescription: string;
  videoThumbnailUrl: string;
}
