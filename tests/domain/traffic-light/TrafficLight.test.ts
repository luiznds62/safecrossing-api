import { TrafficLight } from '../../../src/domain/traffic-light/TrafficLight';
import { TRAFFIC_LIGHT_CONSTS } from './TrafficLightTestUtils';

describe('TrafficLightModel', () => {
  test('Should create TrafficLight', async () => {
    const ret = await TrafficLight.build({
      id: TRAFFIC_LIGHT_CONSTS.trafficLightProps.id,
      name: TRAFFIC_LIGHT_CONSTS.trafficLightProps.name,
      coordinates: TRAFFIC_LIGHT_CONSTS.trafficLightProps.coordinates,
      lastStatus: TRAFFIC_LIGHT_CONSTS.trafficLightProps.lastStatus
    });

    expect(ret).toBeDefined();
    expect(ret.getId()).toBe(TRAFFIC_LIGHT_CONSTS.trafficLightProps.id);
    expect(ret.getCoordinates()).toBe(TRAFFIC_LIGHT_CONSTS.trafficLightProps.coordinates);
    expect(ret.getLastStatus()).toBe(TRAFFIC_LIGHT_CONSTS.trafficLightProps.lastStatus);
  });

  test('Should not create TrafficLight without name', async () => {
    try {
      await TrafficLight.build({
        id: TRAFFIC_LIGHT_CONSTS.trafficLightProps.id,
        name: undefined,
        coordinates: TRAFFIC_LIGHT_CONSTS.trafficLightProps.coordinates,
        lastStatus: TRAFFIC_LIGHT_CONSTS.trafficLightProps.lastStatus
      }).validate();
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('notNull Violation: [O nome deve ser informado]');
    }
  });

  test('Should not create TrafficLight without coordinates', async () => {
    try {
      await TrafficLight.create({
        id: TRAFFIC_LIGHT_CONSTS.trafficLightProps.id,
        name: TRAFFIC_LIGHT_CONSTS.trafficLightProps.name,
        coordinates: undefined,
        lastStatus: TRAFFIC_LIGHT_CONSTS.trafficLightProps.lastStatus
      });
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('notNull Violation: [As coordenadas devem ser informadas]');
    }
  });
});
