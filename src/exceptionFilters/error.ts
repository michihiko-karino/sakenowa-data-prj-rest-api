export class ErrorRes {
  readonly timestamp: string;

  constructor(
    readonly error: string,
    readonly message: string[] | string,
    readonly statusCode: number,
    readonly path: string,
  ) {
    this.timestamp = new Date().toISOString();
  }
}
