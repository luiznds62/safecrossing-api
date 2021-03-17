export class InternalServerError extends Error {
  status: number;

  constructor() {
    super('An internal server error has ocurred');
    this.name = 'InternalServerError';
    this.status = 500;
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }
}