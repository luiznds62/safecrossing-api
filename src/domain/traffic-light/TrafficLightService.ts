import { BasicService } from '../../core/BasicService';
import { TrafficLightRepository } from './TrafficLightRepository';
import { TrafficLight } from './TrafficLight';
import { TRAFFIC_LIGHT_STATUS } from '../../common/Constants';
import { logger } from '../../common/Logger';

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

  async updateStatus(payload) {
    const before = await this.findById(payload.trafficLightId);
    const newStatus = this.getStatusFromColor(payload.color);
    await this.changeLastStatus(payload.trafficLightId, newStatus);
    const after = await this.findById(payload.trafficLightId);
    logger.info(`${before.getAlias()} changed status [${before.getLastStatus()}] to [${after.getLastStatus()}]`);

    return {
      before: before,
      after: after,
      newStatus: newStatus
    }
  }
}
