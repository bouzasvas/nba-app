export interface BaseError {
  name: string;
  description: string;

  httpStatusCode: string;

  fileName: string;
  fileRow: string;
}
