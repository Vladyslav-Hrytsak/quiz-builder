import { Router } from 'express';
import { quizzesController } from './quizzes.controller';

export const quizzesRouter = Router();

quizzesRouter.get('/', quizzesController.getAll);
quizzesRouter.get('/:id', quizzesController.getById);
quizzesRouter.post('/', quizzesController.create);
quizzesRouter.delete('/:id', quizzesController.delete);