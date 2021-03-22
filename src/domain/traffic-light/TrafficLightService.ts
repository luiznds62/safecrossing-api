import { BasicService } from '../../core/BasicService';
import { TrafficLightRepository } from './TrafficLightRepository';
import { TrafficLight } from './TrafficLight';
import { TRAFFIC_LIGHT_STATUS } from '../../common/Constants';

export class TrafficLightService extends BasicService<TrafficLightRepository, TrafficLight> {
  constructor() {
    super(new TrafficLightRepository());
  }

  changeLastStatus(id, status) {
    return this.repository.changeLastStatus(id, status);
  }

  getStatusFromColor(color: string) {
    let status;
    switch (color.toUpperCase()) {
      case 'RED':
        status = TRAFFIC_LIGHT_STATUS.SAFE;
        break;
      case 'YELLOW':
        status = TRAFFIC_LIGHT_STATUS.WAIT;
        break;
      case 'GREEN':
        status = TRAFFIC_LIGHT_STATUS.WAIT;
        break;
    }

    return status;
  }
}
