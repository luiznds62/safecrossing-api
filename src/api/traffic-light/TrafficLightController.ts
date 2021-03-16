import 'reflect-metadata';
import BasicController from '../../core/BasicController';
import { Inject } from 'typescript-ioc';
import { authorize } from '../../core/middleware/AuthorizationMiddleware';
import { TrafficLightService } from '../../domain/traffic-light/TrafficLightService';
import { TrafficLight } from '../../domain/traffic-light/TrafficLight';
import { TrafficLightMap } from './TrafficLightDto';
class TrafficLightController extends BasicController<TrafficLight, TrafficLightService, TrafficLightMap> {
  @Inject
  service: TrafficLightService;

  constructor() {
    super(TrafficLight, '/traffic-lights', new TrafficLightService(), new TrafficLightMap());
    this.applyRoutes();
  }

  applyRoutes = () => {
    this.router.get('/', ...this.findAll);
    this.router.get('/:id', this.findById);
    this.router.post('/', authorize(), this.create);
    this.router.put('/:id', authorize(), this.merge);
    this.router.delete('/:id', authorize(), this.delete);
  };
}

export default new TrafficLightController();
