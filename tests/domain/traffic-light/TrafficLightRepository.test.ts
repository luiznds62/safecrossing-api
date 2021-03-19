import 'reflect-metadata';
import { TrafficLightRepository } from '../../../src/domain/traffic-light/TrafficLightRepository';

describe('TrafficLightRepository', () => {
  test('', () => {
    console.log(1)
  })
  // TrafficLightRepository.prototype.db.findOne = jest.fn().mockImplementation(async (query,fn) => {
  //   fn(false, await new User(USER_CONSTS.userProps));
  // });
  // (<any>TrafficLightRepository.prototype.db).findOne.mockImplementation(async (query, fn) => {
  //   fn(false, await new User(USER_CONSTS.userProps));
  // });
  //
  // (<any>TrafficLightRepository.prototype.db).find.mockImplementation(async (query, fn) => {
  //   const users = [await new User(USER_CONSTS.userProps), await new User(USER_CONSTS.userProps)];
  //   fn(false, users);
  // });
  //
  // (<any>TrafficLightRepository.prototype.db).save.mockImplementation(async (query, fn) => {
  //   fn(false, await new User(USER_CONSTS.userProps));
  // });
  //
  // (<any>TrafficLightRepository.prototype.db).remove.mockImplementation(async (query, {}, fn) => {
  //   fn(false, 1);
  // });
  //
  // const repository: TrafficLightRepository = new TrafficLightRepository();
  //
  // test('Should create instance', async () => {
  //   const repository: TrafficLightRepository = new TrafficLightRepository();
  //
  //   expect(repository).toBeDefined();
  // });
  //
  // test('Should find one TrafficLight', async () => {
  //   const trafficLight: TrafficLight = await repository.findOne({});
  //
  //   expect(trafficLight).toBeDefined();
  //   expect(trafficLight).toBeInstanceOf(TrafficLight);
  // });
  //
  // test('Should find TrafficLights with query', async () => {
  //   const trafficLight: TrafficLight[] = await repository.find({});
  //
  //   expect(trafficLight).toBeDefined();
  //   expect(trafficLight.length).toBeGreaterThan(1);
  // });
  //
  // test('Should find TrafficLight by id', async () => {
  //   const trafficLight: TrafficLight = await repository.findById(1);
  //
  //   expect(trafficLight).toBeDefined();
  //   expect(trafficLight).toBeInstanceOf(TrafficLight);
  // });
  //
  // test('Should create new TrafficLight', async () => {
  //   const trafficLight: TrafficLight = await repository.create(await new TrafficLight(TRAFFIC_LIGHT_CONSTS.trafficLightProps));
  //
  //   expect(trafficLight).toBeDefined();
  //   expect(trafficLight).toBeInstanceOf(TrafficLight);
  // });
  //
  // test('Should update TrafficLight', async () => {
  //   const trafficLight: TrafficLight = await repository.merge(TRAFFIC_LIGHT_CONSTS.trafficLightProps._id, await new TrafficLight(TRAFFIC_LIGHT_CONSTS.trafficLightProps));
  //
  //   expect(trafficLight).toBeDefined();
  //   expect(trafficLight).toBeInstanceOf(TrafficLight);
  // });
  //
  // test('Should delete TrafficLight', async () => {
  //   const numDeleted = await repository.delete(await new TrafficLight(TRAFFIC_LIGHT_CONSTS.trafficLightProps));
  //
  //   expect(numDeleted).toBeDefined();
  //   expect(numDeleted).toBe(1);
  // });
  //
  // afterAll(() => {
  //   jest.clearAllMocks();
  // });
});
