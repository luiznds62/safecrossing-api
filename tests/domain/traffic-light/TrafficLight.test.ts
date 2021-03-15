import { TRAFFIC_LIGHT_STATUS } from '../../../src/common/Constants';
import { Result } from '../../../src/common/Result';
import { TrafficLight } from '../../../src/domain/traffic-light/TrafficLIght';

const CONSTS = {
  _id: 1,
  name: 'tester',
  coordinates: '-28.706328, -49.294791',
  lastStatus: TRAFFIC_LIGHT_STATUS.SAFE
};

describe('TrafficLight', () => {
  test('Should create TrafficLight', async () => {
    const result: Result<TrafficLight> = await TrafficLight.create({
      _id: CONSTS._id,
      name: CONSTS.name,
      coordinates: CONSTS.coordinates,
      lastStatus: CONSTS.lastStatus
    });

    expect(result.getValue()).toBeDefined();
    expect(result.getValue().getId()).toBe(CONSTS._id);
    expect(result.getValue().getCoordinates()).toBe(CONSTS.coordinates);
    expect(result.getValue().getLastStatus()).toBe(CONSTS.lastStatus);
  });

  test('Should not create TrafficLight without name', async () => {
    try {
      await TrafficLight.create({
        _id: CONSTS._id,
        name: undefined,
        coordinates: CONSTS.coordinates,
        lastStatus: CONSTS.lastStatus
      });
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('name should not be null or undefined');
    }
  });

  test('Should not create TrafficLight without coordinates', async () => {
    try {
      await TrafficLight.create({
        _id: CONSTS._id,
        name: CONSTS.name,
        coordinates: undefined,
        lastStatus: CONSTS.lastStatus
      });
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('coordinates should not be null or undefined');
    }
  });
});
