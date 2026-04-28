import { Request, Response } from 'express';
import { quizzesService } from './quizzes.service';

export const quizzesController = {
    async getAll(req: Request, res: Response) {
        const quizzes = await quizzesService.getAll();
        res.json(quizzes);
    },

    async getById(req: Request, res: Response) {
        const quiz = await quizzesService.getById(Number(req.params.id));
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
        res.json(quiz);
    },

    async create(req: Request, res: Response) {
        const quiz = await quizzesService.create(req.body);
        res.status(201).json(quiz);
    },

    async delete(req: Request, res: Response) {
        await quizzesService.delete(Number(req.params.id));
        res.status(204).send();
    },
};