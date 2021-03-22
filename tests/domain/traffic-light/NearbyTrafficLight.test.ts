import { NearbyTrafficLight } from '../../../src/domain/traffic-light/NearbyTrafficLight';
import { TRAFFIC_LIGHT_CONSTS } from './TrafficLightTestUtils';
import { TrafficLight } from '../../../src/domain/traffic-light/TrafficLight';

describe('NearbyTrafficLightModel', () => {
  test('Should create instance of NearbyTrafficLight', () => {
    const nearbyTrafficLight = new NearbyTrafficLight();

    expect(nearbyTrafficLight).toBeDefined();
  });

  test('Should set props and build NearbyTrafficLight', () => {
    const ret = new NearbyTrafficLight()
      .setMetadata({
        originAddress: 'Rua XYZ',
        destinationAddress: 'Rua YZX',
        distance: '1,4',
        duration: '17 minutos'
      })
      .setTrafficLight(TrafficLight.build(TRAFFIC_LIGHT_CONSTS.trafficLightProps))
      .build();

    expect(ret).toBeDefined();
    expect(ret.getTrafficLight()).toBeDefined();
    expect(ret.getMetadata()).toBeDefined();
    expect(ret.getMetadata().distance).toBe('1,4');
    expect(ret.getMetadata().duration).toBe('17 minutos');
  });
});