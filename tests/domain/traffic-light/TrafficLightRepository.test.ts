import nedb from 'nedb';
import { BasicPage } from '../../../src/core/BasicPage';
import { TRAFFIC_LIGHT_CONSTS } from './TrafficLightTestUtils';
import { TrafficLight } from '../../../src/domain/traffic-light/TrafficLight';
import { TrafficLightRepository } from '../../../src/domain/traffic-light/TrafficLightRepository';

jest.mock('nedb');

describe('TrafficLightRepository', () => {
  (<any>nedb).prototype.findOne.mockImplementation(async (query, fn) => {
    fn(false, await new TrafficLight(TRAFFIC_LIGHT_CONSTS.trafficLightProps));
  });

  (<any>nedb).prototype.find.mockImplementation(async (query, fn) => {
    const TrafficLights = [await new TrafficLight(TRAFFIC_LIGHT_CONSTS.trafficLightProps), await new TrafficLight(TRAFFIC_LIGHT_CONSTS.trafficLightProps)];
    fn(false, TrafficLights);
  });

  (<any>nedb).prototype.insert.mockImplementation(async (query, fn) => {
    fn(false, await new TrafficLight(TRAFFIC_LIGHT_CONSTS.trafficLightProps));
  });

  (<any>nedb).prototype.update.mockImplementation(async (query, model, {}, fn) => {
    fn(false, await new TrafficLight(TRAFFIC_LIGHT_CONSTS.trafficLightProps));
  });

  (<any>nedb).prototype.remove.mockImplementation(async (query, {}, fn) => {
    fn(false, 1);
  });

  (<any>nedb).prototype.loadDatabase.mockImplementation(async (fn) => {
    fn(false);
  });

  const repository: TrafficLightRepository = new TrafficLightRepository();

  test('Should create instance', async () => {
    const repository: TrafficLightRepository = new TrafficLightRepository();

    expect(repository).toBeDefined();
  });

  test('Should find one TrafficLight', async () => {
    const trafficLight: TrafficLight = await repository.findOne({});

    expect(trafficLight).toBeDefined();
    expect(trafficLight).toBeInstanceOf(TrafficLight);
  });

  test('Should find TrafficLights with query', async () => {
    const trafficLight: TrafficLight[] = await repository.find({});

    expect(trafficLight).toBeDefined();
    expect(trafficLight.length).toBeGreaterThan(1);
  });

  test('Should find TrafficLight by id', async () => {
    const trafficLight: TrafficLight = await repository.findById(1);

    expect(trafficLight).toBeDefined();
    expect(trafficLight).toBeInstanceOf(TrafficLight);
  });

  test('Should create new TrafficLight', async () => {
    const trafficLight: TrafficLight = await repository.create(await new TrafficLight(TRAFFIC_LIGHT_CONSTS.trafficLightProps));

    expect(trafficLight).toBeDefined();
    expect(trafficLight).toBeInstanceOf(TrafficLight);
  });

  test('Should update TrafficLight', async () => {
    const trafficLight: TrafficLight = await repository.merge(TRAFFIC_LIGHT_CONSTS.trafficLightProps._id, await new TrafficLight(TRAFFIC_LIGHT_CONSTS.trafficLightProps));

    expect(trafficLight).toBeDefined();
    expect(trafficLight).toBeInstanceOf(TrafficLight);
  });

  test('Should delete TrafficLight', async () => {
    const numDeleted = await repository.delete(TRAFFIC_LIGHT_CONSTS.trafficLightProps._id);

    expect(numDeleted).toBeDefined();
    expect(numDeleted).toBe(1);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
