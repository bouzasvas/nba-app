import {environment} from '../environments/environment';

export class AppConstants {
  // public static officialNbaApiUrl = 'https://stats.nba.com/stats';
  public static baseNbaApiUrlCorsAnywhere = 'http://localhost:8080/https://stats.nba.com/stats';
  public static baseNbaApiUrl = environment.apiUrl;
}
