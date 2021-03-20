import { logger } from './Logger';
import { HTTP_STATUS } from './Constants';
import * as express from 'express';

function isValidationError(message: string) {
  return message.includes('[') && message.includes(']') ? true : false;
}

export const errorHandler = (error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error(error);
  res.status(isValidationError(error.message) ? HTTP_STATUS.VALIDATION_ERROR : error.status || HTTP_STATUS.INTERNAL_SERVER_ERROR);
  res.json({ message: error.message });
  next();
};