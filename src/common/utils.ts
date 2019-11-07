export class Utils {

  public static getCurrentSeasonYear(): string {
    const d = new Date();

    const currentYear = d.getFullYear();
    const nextYear = currentYear + 1;

    // Convert nextYear to Str
    const nextYearStr = String(nextYear);
    return `${currentYear}-${nextYearStr.substring(2)}`;
  }
}
