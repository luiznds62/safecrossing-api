import express from 'express';
import expressWs from 'express-ws';
import EventEmitter from 'events';
import environment from '../common/Environments';
import methodOverride from 'method-override';
import { logger } from '../common/Logger';
import { errorHandler } from '../common/ErrorHandler';
import { TokenParser } from '../security/TokenParser';
import { openConnection } from '../core/DatabaseConnection';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import { TrafficLightWS } from '../api/traffic-light/TrafficLightWS';

export default class Server extends EventEmitter {
  application;

  constructor() {
    super();
    const { app, getWss } = expressWs(express());
    this.application = app;
    this.initListeners();
    this.initWS(getWss);
  }

  initWS(getWss) {
    new TrafficLightWS(this.application, getWss);
  }

  initListeners() {
    this.on('listening', () => {
      logger.info(`Server is listening on port: ${environment.SERVER.PORT}`);
    });

    this.on('closing', () => {
      logger.info(`Server is closing`);
    });

    // Endpoint that Arduino will get the port from Heroku to connect to WS
    this.application.get('/port', function(req, res) {
      res.send(environment.SERVER.PORT);
    });

    return this;
  }

  initRoutes() {
    this.application.use(new TokenParser().parse);
    const routes = require('../api/router');
    Object.values(routes).forEach((route) => {
      this.application.use((<any>route).basePath, (<any>route).router);
    });
    this.application.use(errorHandler);
    return this;
  }

  async initInfrastructure() {
    openConnection()
      .then(async () => {
        //sequelize.sync({ force: true });
        logger.info('Connection has been established successfully.');
      })
      .catch(err => {
        logger.error('Unable to connect to the database:', err);
      });
  }

  start() {
    return new Promise((resolve, reject) => {
      try {
        this.application.use(bodyParser.urlencoded({ extended: true }));
        this.application.use(bodyParser.json());
        this.application.use(methodOverride());
        this.application.use(cors());
        this.application.listen(environment.SERVER.PORT);
        this.emit('listening');
        resolve(this);
      } catch (error) {
        reject(error);
      }
    });
  }
}
