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
}
