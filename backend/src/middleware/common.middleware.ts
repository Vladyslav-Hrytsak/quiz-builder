import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'joi';
import { ApiError } from '../errors/ApiError';

class CommonMiddleware {
    public isBodyValid(schema: ObjectSchema) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                req.body = await schema.validateAsync(req.body, { abortEarly: true });
                next();
            } catch (e: any) {
                next(new ApiError(e.details[0].message, 400));
            }
        };
    }

    public isIdValid(key: string) {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                const id = Number(req.params[key]);
                if (!Number.isInteger(id) || id <= 0) {
                    throw new ApiError(`Invalid ID: ${key}`, 400);
                }
                next();
            } catch (e) {
                next(e);
            }
        };
    }
}

export const commonMiddleware = new CommonMiddleware();