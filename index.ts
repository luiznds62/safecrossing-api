import 'dotenv/config';
import Server from './src/server/Server';
import { logger } from './src/common/Logger';

const server = new Server();

server
  .start()
  .then(async (server: Server) => {
    server.initRoutes();
    await server.initInfrastructure();
  })
  .catch((err) => {
    logger.error(err);
  });