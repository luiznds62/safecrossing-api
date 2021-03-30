import 'reflect-metadata';
import express from 'express';
import { BasicService } from './BasicService';
import { Mapper } from './Mapper';
import { HTTP_STATUS } from '../common/Constants';
import { IPaginatedRequest, paginationMiddleware } from './middleware/PaginationMiddleware';
import { Inject } from 'typescript-ioc';
import { NotFoundError } from './exception/NotFoundError';
import expressWs from 'express-ws';

abstract class BasicController<T, K extends BasicService<any, T>, M extends Mapper<T>> {
  basePath: string;
  model: T;
  service: K;
  mapper: M;
  router = express.Router() as expressWs.Router;

  constructor(model, path: string, @Inject mapper: M) {
    this.model = new model();
    this.basePath = path;
    this.mapper = mapper;
  }

  findAll = [
    paginationMiddleware,
    async (req: IPaginatedRequest, res: express.Response, next: express.NextFunction) => {
      try {
        let page = await this.service.findAll(req.pagination.offset, req.pagination.limit, req.pagination.sort);
        page.setContent(
          page.getContent().map((raw) => {
            return this.mapper.toDTO(raw);
          })
        );
        res.json(page);
        next();
      } catch (error) {
        next(error);
      }
    }
  ];

  findById = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const model: T = await this.service.findById(req.params.id);
      if (!model) {
        throw new NotFoundError('Document not found');
      }

      res.json(this.mapper.toDTO(model));
      next();
    } catch (error) {
      next(error);
    }
  };

  create = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const representation = await this.mapper.toDomain(req.body);
      const model: T = await this.service.create(representation);
      res.status(HTTP_STATUS.CREATED);
      res.json(this.mapper.toDTO(model));
      next();
    } catch (error) {
      next(error);
    }
  };

  merge = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const representation = await this.mapper.toDomain(req.body);
      const model: T = await this.service.merge(req.params.id, representation);
      res.json(this.mapper.toDTO(model));
      next();
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const model = await this.service.findById(req.params.id);
      if (!model) {
        throw new NotFoundError('Document not found');
      }
      await this.service.delete(model);
      res.sendStatus(HTTP_STATUS.SUCCESS_NO_CONTEND);
      next();
    } catch (error) {
      next(error);
    }
  };
}

export default BasicController;
