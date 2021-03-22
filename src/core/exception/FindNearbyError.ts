export class FindNearbyError extends Error {
  status: number;

  constructor() {
    super('Ocorreu um erro ao buscar semáforos próximos, fique atento e mantenha os cuidados');
    this.name = 'FindNearbyError';
    this.status = 500;
    Object.setPrototypeOf(this, FindNearbyError.prototype);
  }
}