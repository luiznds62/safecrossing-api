import 'reflect-metadata';
import BasicController from '../../core/BasicController';
import { Inject } from 'typescript-ioc';
import { authorize } from '../../core/middleware/AuthorizationMiddleware';
import { TrafficLightService } from '../../domain/traffic-light/TrafficLightService';
import { TrafficLight } from '../../domain/traffic-light/TrafficLight';
import { TrafficLightMap } from './TrafficLightDto';
import express from 'express';
import { GoogleMapsService } from '../../core/GoogleMapsService';
import { FindNearbyError } from '../../core/exception/FindNearbyError';

class TrafficLightController extends BasicController<TrafficLight, TrafficLightService, TrafficLightMap> {
  @Inject
  service: TrafficLightService;

  @Inject
  googleMapsService: GoogleMapsService;

  constructor() {
    super(TrafficLight, '/traffic-lights', new TrafficLightMap());
    this.applyRoutes();
  }

  applyRoutes = () => {
    this.router.get('/', ...this.findAll);
    this.router.get('/:id', this.findById);
    this.router.post('/', authorize(), this.create);
    this.router.put('/:id', authorize(), this.merge);
    this.router.delete('/:id', authorize(), this.delete);
    this.router.get('/nearby/:coordinate', authorize(), this.findNearbyWithCoordinate);
  };

  findNearbyWithCoordinate = async (req: express.Request, resp: express.Response, next) => {
    try {
      resp.json(await this.googleMapsService.getTrafficLightsByCoordinate(req.params.coordinate));
      next();
    } catch (e) {
      throw new FindNearbyError();
    }
  };
}

export default new TrafficLightController();
