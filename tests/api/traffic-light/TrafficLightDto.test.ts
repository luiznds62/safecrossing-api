import { TrafficLightMap } from '../../../src/api/traffic-light/TrafficLightDto';
import { TrafficLight } from '../../../src/domain/traffic-light/TrafficLight';
import { TRAFFIC_LIGHT_CONSTS } from '../../domain/traffic-light/TrafficLightTestUtils';

describe('TrafficLightDto', () => {
  test('Should do to domain', async () => {
    const trafficLight = await new TrafficLightMap().toDomain(TRAFFIC_LIGHT_CONSTS.trafficLightProps);

    expect(trafficLight).toBeDefined();
    expect(trafficLight).toBeInstanceOf(TrafficLight);
    expect(trafficLight.getId()).toBe(TRAFFIC_LIGHT_CONSTS.trafficLightProps.id);
    expect(trafficLight.getName()).toBe(TRAFFIC_LIGHT_CONSTS.trafficLightProps.name);
    expect(trafficLight.getCoordinates()).toBe(TRAFFIC_LIGHT_CONSTS.trafficLightProps.coordinates);
    expect(trafficLight.getLastStatus()).toBe(TRAFFIC_LIGHT_CONSTS.trafficLightProps.lastStatus);
  });

  test('Should throw validation error in to domain', async () => {
    try {
      await new TrafficLightMap().toDomain({
        _id: '',
        name: '',
        coordinates: TRAFFIC_LIGHT_CONSTS.trafficLightProps.coordinates,
        lastStatus: TRAFFIC_LIGHT_CONSTS.trafficLightProps.lastStatus
      });
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.status).toBe(422);
    }
  });

  test('Should do to Dto', () => {
    const dto = new TrafficLightMap().toDTO(new TrafficLight(TRAFFIC_LIGHT_CONSTS.trafficLightProps));

    expect(dto).toBeDefined();
    expect(dto.id).toBeDefined();
    expect(dto.name).toBeDefined();
    expect(dto.coordinates).toBeDefined();
    expect(dto.lastStatus).toBeDefined();
  });
});
