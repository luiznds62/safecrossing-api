import { TrafficLight } from '../../../src/domain/traffic-light/TrafficLight';
import { TRAFFIC_LIGHT_CONSTS } from './TrafficLightTestUtils';
import { TrafficLightRepository } from '../../../src/domain/traffic-light/TrafficLightRepository';

describe('TrafficLightRepository', () => {
  (<any>TrafficLight).beforePersist = () => {
    return TrafficLight.build(TRAFFIC_LIGHT_CONSTS.trafficLightProps);
  };
  (<any>TrafficLight).findOne = () => {
    return TrafficLight.build(TRAFFIC_LIGHT_CONSTS.trafficLightProps);
  };
  (<any>TrafficLight).findAll = () => {
    return [TrafficLight.build(TRAFFIC_LIGHT_CONSTS.trafficLightProps), TrafficLight.build(TRAFFIC_LIGHT_CONSTS.trafficLightProps)];
  };
  (<any>TrafficLight).create = () => {
    return TrafficLight.build(TRAFFIC_LIGHT_CONSTS.trafficLightProps);
  };
  (<any>TrafficLight).update = () => {
    return (TrafficLight.build(TRAFFIC_LIGHT_CONSTS.trafficLightProps));
  };
  (<any>TrafficLight).destroy = () => {
    return undefined;
  };

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
    const users: TrafficLight[] = await repository.find({});

    expect(users).toBeDefined();
    expect(users.length).toBeGreaterThan(1);
  });

  test('Should find trafficLight by id', async () => {
    const trafficLight: TrafficLight = await repository.findById(1);

    expect(trafficLight).toBeDefined();
    expect(trafficLight).toBeInstanceOf(TrafficLight);
  });

  test('Should create new TrafficLight', async () => {
    const trafficLight: TrafficLight = await repository.create(<any>TrafficLight.build(TRAFFIC_LIGHT_CONSTS.trafficLightProps));

    expect(trafficLight).toBeDefined();
    expect(trafficLight).toBeInstanceOf(TrafficLight);
  });

  test('Should update TrafficLight', async () => {
    const trafficLight: TrafficLight = await repository.merge(TRAFFIC_LIGHT_CONSTS.trafficLightProps.id, <any>TrafficLight.build(TRAFFIC_LIGHT_CONSTS.trafficLightProps));

    expect(trafficLight).toBeDefined();
    expect(trafficLight).toBeInstanceOf(TrafficLight);
  });

  test('Should delete trafficLight', async () => {
    const numDeleted = await repository.delete((<any>TrafficLight.build(TRAFFIC_LIGHT_CONSTS.trafficLightProps)).dataValues);

    expect(numDeleted).toBeUndefined();
  });
})
;
