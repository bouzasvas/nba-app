export interface PointsPerQuarter {
  qtr1: number;
  qtr2: number;
  qtr3: number;
  qtr4: number;

  // We use an (optional) array for OT Quarters - each element is points per OT Qtr, ex. otQtrArray[0] = PTS for OT1
  otQtrArray?: Array<number>;
  total: number;
}
