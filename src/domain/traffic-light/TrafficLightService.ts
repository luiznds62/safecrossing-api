import { BasicService } from '../../core/BasicService';
import { TrafficLightRepository } from './TrafficLightRepository';
import { TrafficLight } from './TrafficLight';

export class TrafficLightService extends BasicService<TrafficLightRepository, TrafficLight> {
  constructor() {
    super(new TrafficLightRepository());
  }
}
