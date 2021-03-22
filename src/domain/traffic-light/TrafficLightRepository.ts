import { BasicRepository } from '../../core/BasicRepository';
import { TrafficLight } from './TrafficLight';

export class TrafficLightRepository extends BasicRepository<TrafficLight> {
  constructor() {
    super(TrafficLight);
  }

  async changeLastStatus(id, lastStatus): Promise<TrafficLight> {
    const trafficLight = await this.findOne({ id: id });
    trafficLight.setLastStatus(lastStatus);
    return this.merge(id, trafficLight);
  }
}
