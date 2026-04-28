import { quizzesRepository } from './quizzes.repository';
import {
  IQuizCreate,
  IQuizListResponse,
} from '../interfaces/quizzes.interface';

class QuizzesService {
  public async getAll(): Promise<IQuizListResponse[]> {
    const quizzes = await quizzesRepository.findAll();
    return quizzes.map((q) => ({
      id: q.id,
      title: q.title,
      createdAt: q.createdAt,
      questionCount: q.questions.length,
    }));
  }

  public async getById(id: number) {
    const quiz = await quizzesRepository.findById(id);
    if (!quiz) return null;

    return {
      ...quiz,
      questions: quiz.questions.map((q) => ({
        ...q,
        options: q.options ? JSON.parse(q.options) : null,
      })),
    };
  }

  public async create(data: IQuizCreate) {
    return quizzesRepository.create(data);
  }

  public async delete(id: number) {
    return quizzesRepository.delete(id);
  }
}

export const quizzesService = new QuizzesService();
