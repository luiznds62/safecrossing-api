import { InternalServerError } from '../../../src/core/exception/InternalServerError';

describe('InternalServerError', () => {
  test('Should throw InternalServerError exception', () => {
    try {
      throw new InternalServerError();
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.status).toBe(500);
      expect(error.message).toBe('An internal server error has ocurred');
    }
  });
});
