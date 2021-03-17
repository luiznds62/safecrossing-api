import 'dotenv/config';
import Server from './src/server/Server';
import { logger } from './src/common/Logger';

const server = new Server();

server
  .start()
  .then((server: Server) => {
    server.initRoutes();
    server.initInfrastructure();
  })
  .catch((err) => {
    logger.error(err);
  });

process.stdin.resume();
[`exit`, `SIGINT`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`, `SIGTERM`].forEach((eventType) => {
  process.on(eventType, () => server.cleanUp());
})