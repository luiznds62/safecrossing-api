import { Inject } from 'typescript-ioc';
import { TrafficLightService } from '../../domain/traffic-light/TrafficLightService';
import { logger } from '../../common/Logger';

export class TrafficLightWS {

  @Inject
  private service: TrafficLightService;

  constructor(app, getWss) {
    const aWss = getWss('/');

    app.ws('/traffic-light', (ws, req) => {
      ws.on('message', async msg => {
        try {
          const payload = JSON.parse(msg);
          const message = await this.service.updateStatus(payload);

          aWss.clients.forEach(client => {
            client.send(JSON.stringify(message));
          });

        } catch (e) {
          logger.error(e.message);
        }
      });
      console.log('socket', req.testing);
    });
  }

}