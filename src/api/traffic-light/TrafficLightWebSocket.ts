import { Server } from 'socket.io';
import { logger } from '../../common/Logger';
import { TRAFFIC_LIGHT_WS } from '../../common/Constants';
import { TrafficLightService } from '../../domain/traffic-light/TrafficLightService';
import { Inject } from 'typescript-ioc';
import { ForbiddenError } from '../../core/exception/ForbiddenError';
import { NotAuthorizedError } from '../../core/exception/NotAuthorizedError';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import environment from '../../common/Environments';
import jwt from 'jsonwebtoken';

class TrafficLightWebSocket {
  io;

  @Inject
  private trafficLightService: TrafficLightService;

  constructor(private httpServer) {
    this.io = new Server(httpServer);

    const rateLimiter = new RateLimiterMemory(
      {
        points: 5,
        duration: 1
      });

    this.io.use(async (socket, next) => {
      try {
        await rateLimiter.consume(socket.handshake.address);
        const token = socket.handshake.auth.token;
        if (token) {
          jwt.verify(token, environment.SECURITY.API_SECRET, (error, decoded) => {
            if (decoded) {
              next();
            } else {
              next(new NotAuthorizedError('Invalid credentials'));
            }
          });
        } else {
          next(new ForbiddenError('Access denied'));
        }
      } catch (e) {
        socket.emit('blocked', { 'retry-ms': e.msBeforeNext });
      }
    });

    this.io.on('connection', socket => {
      socket.on(TRAFFIC_LIGHT_WS.CHANGED_STATUS, async (payload) => {
        const before = await this.trafficLightService.findById(payload.trafficLightId);
        const newStatus = this.trafficLightService.getStatusFromColor(payload.color);
        await this.trafficLightService.changeLastStatus(payload.trafficLightId, newStatus);
        const after = await this.trafficLightService.findById(payload.trafficLightId);
        logger.info(`${before.getAlias()} changed status [${before.getLastStatus()}] to [${after.getLastStatus()}]`);

        socket.emit(TRAFFIC_LIGHT_WS.BROADCAST_STATUS, {
          before: before,
          after: after,
          newStatus: newStatus
        });
      });
    });
  }
}

export { TrafficLightWebSocket };