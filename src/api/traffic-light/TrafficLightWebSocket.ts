import { Server } from 'socket.io';
import { logger } from '../../common/Logger';
import { TRAFFIC_LIGHT_WS } from '../../common/Constants';
import { TrafficLightService } from '../../domain/traffic-light/TrafficLightService';
import { Inject } from 'typescript-ioc';

class TrafficLightWebSocket {
  io;

  @Inject
  private trafficLightService: TrafficLightService;

  constructor(private httpServer) {
    this.io = new Server(httpServer);

    this.io.on('connection', socket => {
      socket.on(TRAFFIC_LIGHT_WS.CHANGED_STATUS, async (payload) => {
        const before = await this.trafficLightService.findById(payload.trafficLightId);
        const newStatus = this.trafficLightService.getStatusFromColor(payload.color);
        await this.trafficLightService.changeLastStatus(payload.trafficLightId, newStatus);
        const after = await this.trafficLightService.findById(payload.trafficLightId);
        logger.info(`${before.getAlias()} changed status [${before.getLastStatus()}] to [${after.getLastStatus()}]`);
      });
    });
  }
}

export { TrafficLightWebSocket };