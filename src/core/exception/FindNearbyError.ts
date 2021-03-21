export class FindNearbyError extends Error {
  status: number;

  constructor() {
    super('Ocorreu um erro ao buscar semáforos próximos, fique atento e mantenha os cuidados');
    this.name = 'BadRequestError';
    this.status = 400;
    Object.setPrototypeOf(this, FindNearbyError.prototype);
  }
}