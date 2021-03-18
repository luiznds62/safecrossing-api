import { TRAFFIC_LIGHT_STATUS } from '../../../src/common/Constants';

export const TRAFFIC_LIGHT_CONSTS = {
  pagination: {
    offset: 0,
    limit: 20,
    sort: ''
  },
  trafficLightProps: {
    _id: 1,
    name: 'testes',
    coordinates: '-28.706328, -49.294791',
    lastStatus: TRAFFIC_LIGHT_STATUS.SAFE
  },
  changedTrafficLight: 'Changed TrafficLight',
  affecteds: 1
};
