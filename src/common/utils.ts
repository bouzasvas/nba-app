// Moment Timezone
import * as moment_tz from 'moment-timezone';

export class Utils {

  public static getCurrentSeasonYear(): string {
    const currentYear = Utils.getCurrentYear();
    const nextYear = currentYear + 1;

    // Convert nextYear to Str
    const nextYearStr = String(nextYear);
    return `${currentYear}-${nextYearStr.substring(2)}`;
  }

  public static getCurrentYear(): number {
    const d = new Date();

    let currentYear = d.getFullYear();
    const currentMonth = d.getMonth();

    if (currentMonth < 8) {
      currentYear = currentYear - 1;
    }

    return currentYear;
  }

  public static convertToCurrentTimezone(dateStr: string): string {
    // Default API Timezone
    const defaultTimezone = 'EST';

    const gameIsLive = !dateStr.includes('ET');
    // If Game is Live Return Game Status Instead
    if (gameIsLive) {
      return dateStr;
    }

    // Set-Get Local Timezone
    moment_tz.tz.setDefault();
    const localTimezone = moment_tz.tz.guess();
    const defaultTimezoneMoment = moment_tz.tz(dateStr, 'h:mm A', defaultTimezone);

    return defaultTimezoneMoment.tz(localTimezone).format('HH:mm');
  }
}
