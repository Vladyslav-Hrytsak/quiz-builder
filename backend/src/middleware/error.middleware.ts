import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../errors/ApiError';

class ErrorMiddleware {
  public handle(err: Error, req: Request, res: Response, next: NextFunction) {
    console.error(`[ERROR] ${req.method} ${req.url} —`, err.message);

    if (err instanceof ApiError) {
      return res.status(err.status).json({
        error: err.message,
        status: err.status,
      });
    }

    return res.status(500).json({
      error: 'Internal server error',
      status: 500,
    });
  }
}

export const errorMiddleware = new ErrorMiddleware();
