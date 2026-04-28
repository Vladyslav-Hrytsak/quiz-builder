import { Router } from 'express';
import { quizzesController } from './quizzes.controller';
import { commonMiddleware } from '../middleware/common.middleware';
import { createQuizSchema } from '../validator/quiz.validator';

export const quizzesRouter = Router();

quizzesRouter.get('/', quizzesController.getAll);
quizzesRouter.get(
  '/:id',
  commonMiddleware.isIdValid('id'),
  quizzesController.getById,
);
quizzesRouter.post(
  '/',
  commonMiddleware.isBodyValid(createQuizSchema),
  quizzesController.create,
);
quizzesRouter.delete(
  '/:id',
  commonMiddleware.isIdValid('id'),
  quizzesController.delete,
);
