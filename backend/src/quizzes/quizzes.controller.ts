import { NextFunction, Request, Response } from 'express';
import { quizzesService } from './quizzes.service';
import { ApiError } from '../errors/ApiError';

class QuizzesController {
    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const quizzes = await quizzesService.getAll();
            res.json(quizzes);
        } catch (e) {
            next(e);
        }
    }

    public async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const quiz = await quizzesService.getById(Number(req.params.id));
            if (!quiz) return next(ApiError.notFound('Quiz not found'));
            res.json(quiz);
        } catch (e) {
            next(e);
        }
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const quiz = await quizzesService.create(req.body);
            res.status(201).json(quiz);
        } catch (e) {
            next(e);
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const existing = await quizzesService.getById(id);
            if (!existing) return next(ApiError.notFound('Quiz not found'));
            await quizzesService.delete(id);
            res.status(204).send();
        } catch (e) {
            next(e);
        }
    }
}

export const quizzesController = new QuizzesController();