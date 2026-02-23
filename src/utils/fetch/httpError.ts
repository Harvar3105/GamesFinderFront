export class HttpError extends Error {
  public readonly status: number;
  public readonly body?: unknown;

  constructor(status: number, message: string, body?: unknown) {
    super(message);

    this.status = status;
    this.body = body;

    Object.setPrototypeOf(this, HttpError.prototype);
  }
}
