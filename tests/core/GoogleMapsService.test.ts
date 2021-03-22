import { GoogleMapsService } from '../../src/core/GoogleMapsService';

describe('GoogleMapsService', () => {
  const googleMapsService = new GoogleMapsService();

  test('Should create instance', () => {
    const googleMapsService = new GoogleMapsService();

    expect(googleMapsService).toBeDefined();
  });

  test('Should get distance from string', () => {
    const distance = googleMapsService.getDistanceFromResponse('1.4 km');

    expect(distance).toBeDefined();
    expect(distance).toBe(1.4);
  });
});