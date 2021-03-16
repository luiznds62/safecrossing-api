import { Result } from '../../../src/common/Result';
import { TrafficLight } from '../../../src/domain/traffic-light/TrafficLight';
import { TRAFFIC_LIGHT_CONSTS } from './TrafficLightTestUtils';

describe('TrafficLight', () => {
  test('Should create TrafficLight', async () => {
    const result: Result<TrafficLight> = await TrafficLight.create({
      _id: TRAFFIC_LIGHT_CONSTS.trafficLightProps._id,
      name: TRAFFIC_LIGHT_CONSTS.trafficLightProps.name,
      coordinates: TRAFFIC_LIGHT_CONSTS.trafficLightProps.coordinates,
      lastStatus: TRAFFIC_LIGHT_CONSTS.trafficLightProps.lastStatus
    });

    expect(result.getValue()).toBeDefined();
    expect(result.getValue().getId()).toBe(TRAFFIC_LIGHT_CONSTS.trafficLightProps._id);
    expect(result.getValue().getCoordinates()).toBe(TRAFFIC_LIGHT_CONSTS.trafficLightProps.coordinates);
    expect(result.getValue().getLastStatus()).toBe(TRAFFIC_LIGHT_CONSTS.trafficLightProps.lastStatus);
  });

  test('Should not create TrafficLight without name', async () => {
    try {
      await TrafficLight.create({
        _id: TRAFFIC_LIGHT_CONSTS.trafficLightProps._id,
        name: undefined,
        coordinates: TRAFFIC_LIGHT_CONSTS.trafficLightProps.coordinates,
        lastStatus: TRAFFIC_LIGHT_CONSTS.trafficLightProps.lastStatus
      });
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('name should not be null or undefined');
    }
  });

  test('Should not create TrafficLight without coordinates', async () => {
    try {
      await TrafficLight.create({
        _id: TRAFFIC_LIGHT_CONSTS.trafficLightProps._id,
        name: TRAFFIC_LIGHT_CONSTS.trafficLightProps.name,
        coordinates: undefined,
        lastStatus: TRAFFIC_LIGHT_CONSTS.trafficLightProps.lastStatus
      });
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('coordinates should not be null or undefined');
    }
  });
});
