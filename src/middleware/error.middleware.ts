import { NextFunction, Request, Response } from 'express';

import { InternalServerErrorResponse } from '../helpers/http';
import moment from 'moment';

export const errorMiddleware = (error: any, req: Request, res: Response, next: NextFunction) => {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong.';
  console.error('[' + moment().format('DD/MM/YYYY hh:mm:ss a') + '] ', error);
  return InternalServerErrorResponse(res, message, status);
};
