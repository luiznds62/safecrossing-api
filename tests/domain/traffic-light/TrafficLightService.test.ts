import 'reflect-metadata';
import { BasicPage } from '../../../src/core/BasicPage';
import { TrafficLight } from '../../../src/domain/traffic-light/TrafficLight';
import { TRAFFIC_LIGHT_CONSTS } from './TrafficLightTestUtils';
import { TrafficLightService } from '../../../src/domain/traffic-light/TrafficLightService';
import { TrafficLightRepository } from '../../../src/domain/traffic-light/TrafficLightRepository';
jest.mock('../../../src/domain/traffic-light/TrafficLightRepository');

describe('TrafficLightService', () => {
  const trafficLightPage = new BasicPage()
    .setContent([new TrafficLight(TRAFFIC_LIGHT_CONSTS.trafficLightProps)])
    .setHasNext(false)
    .setTotal(1)
    .build();

  TrafficLightRepository.prototype.findAll = jest.fn().mockReturnValue(trafficLightPage);
  TrafficLightRepository.prototype.findOne = jest.fn().mockReturnValue(new TrafficLight(TRAFFIC_LIGHT_CONSTS.trafficLightProps));
  TrafficLightRepository.prototype.create = jest.fn().mockReturnValue(new TrafficLight(TRAFFIC_LIGHT_CONSTS.trafficLightProps));
  TrafficLightRepository.prototype.merge = jest.fn().mockReturnValue(new TrafficLight({
    _id: TRAFFIC_LIGHT_CONSTS.trafficLightProps.id,
    name: TRAFFIC_LIGHT_CONSTS.changedTrafficLight,
    coordinates: TRAFFIC_LIGHT_CONSTS.trafficLightProps.coordinates,
    lastStatus: TRAFFIC_LIGHT_CONSTS.trafficLightProps.lastStatus
  }));
  TrafficLightRepository.prototype.findById = jest.fn().mockReturnValue(new TrafficLight(TRAFFIC_LIGHT_CONSTS.trafficLightProps));
  TrafficLightRepository.prototype.delete = jest.fn().mockReturnValue(TRAFFIC_LIGHT_CONSTS.affecteds);

  const trafficLightRepository = new TrafficLightRepository();
  TrafficLightService.prototype.repository = trafficLightRepository;
  const service = new TrafficLightService();

  test('Should find All users with pagination props', async () => {
    const users: BasicPage<TrafficLight> = await service.findAll(TRAFFIC_LIGHT_CONSTS.pagination.offset, TRAFFIC_LIGHT_CONSTS.pagination.limit, TRAFFIC_LIGHT_CONSTS.pagination.sort);

    expect(users).toBeDefined();
    expect(users).toBeInstanceOf(BasicPage);
    expect(users.getContent()[0].getName()).toBe(TRAFFIC_LIGHT_CONSTS.trafficLightProps.name);
    expect(users.getContent()[0].getCoordinates()).toBe(TRAFFIC_LIGHT_CONSTS.trafficLightProps.coordinates);
    expect(users.getContent()[0].getLastStatus()).toBe(TRAFFIC_LIGHT_CONSTS.trafficLightProps.lastStatus);
    expect(users.getTotal()).toBe(1);
    expect(users.getHasNext()).toBe(false);
  });

  test('Should find TrafficLight by id', async () => {
    const trafficLight: TrafficLight = await service.findById(TRAFFIC_LIGHT_CONSTS.trafficLightProps.id);

    expect(trafficLight).toBeDefined();
    expect(trafficLight).toBeInstanceOf(TrafficLight);
    expect(trafficLight.getName()).toBe(TRAFFIC_LIGHT_CONSTS.trafficLightProps.name);
    expect(trafficLight.getCoordinates()).toBe(TRAFFIC_LIGHT_CONSTS.trafficLightProps.coordinates);
    expect(trafficLight.getLastStatus()).toBe(TRAFFIC_LIGHT_CONSTS.trafficLightProps.lastStatus);
  });

  test('Should create TrafficLight', async () => {
    const trafficLight: TrafficLight = await service.create(TRAFFIC_LIGHT_CONSTS.trafficLightProps);

    expect(trafficLight).toBeDefined();
    expect(trafficLight).toBeInstanceOf(TrafficLight);
    expect(trafficLight.getName()).toBe(TRAFFIC_LIGHT_CONSTS.trafficLightProps.name);
    expect(trafficLight.getCoordinates()).toBe(TRAFFIC_LIGHT_CONSTS.trafficLightProps.coordinates);
    expect(trafficLight.getLastStatus()).toBe(TRAFFIC_LIGHT_CONSTS.trafficLightProps.lastStatus);
  });

  test('Should update TrafficLight', async () => {
    const trafficLight: TrafficLight = await service.create(TRAFFIC_LIGHT_CONSTS.trafficLightProps);

    trafficLight.setName(TRAFFIC_LIGHT_CONSTS.changedTrafficLight);
    const updated: TrafficLight = await service.merge(trafficLight.getId(), trafficLight);

    expect(updated).toBeDefined();
    expect(updated).toBeInstanceOf(TrafficLight);
    expect(updated.getName()).toBe(TRAFFIC_LIGHT_CONSTS.changedTrafficLight);
    expect(updated.getCoordinates()).toBe(TRAFFIC_LIGHT_CONSTS.trafficLightProps.coordinates);
    expect(updated.getLastStatus()).toBe(TRAFFIC_LIGHT_CONSTS.trafficLightProps.lastStatus);
  });

  test('Should delete TrafficLight', async () => {
    const affecteds = await service.delete(TRAFFIC_LIGHT_CONSTS.trafficLightProps.id);

    expect(affecteds).toBeDefined();
    expect(affecteds).toBe(TRAFFIC_LIGHT_CONSTS.affecteds);
  });

});
