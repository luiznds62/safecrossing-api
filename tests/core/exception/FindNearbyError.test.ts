import { FindNearbyError } from '../../../src/core/exception/FindNearbyError';

describe('FindNearbyError', () => {
  test('Should throw FindNearbyError exception', () => {
    try {
      throw new FindNearbyError();
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.status).toBe(500);
      expect(error.message).toBe('Ocorreu um erro ao buscar semáforos próximos, fique atento e mantenha os cuidados');
    }
  });
});
