import { BasicRepository } from '../../core/BasicRepository';
import { TrafficLight } from './TrafficLight';

export class TrafficLightRepository extends BasicRepository<TrafficLight> {
  constructor() {
    super(TrafficLight);
  }
}
