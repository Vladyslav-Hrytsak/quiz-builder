import { prisma } from '../prisma/prisma.service';
import { IQuizCreate } from '../interfaces/quizzes.interface';

class QuizzesRepository {
  public findAll() {
    return prisma.quiz.findMany({
      include: { questions: true },
    });
  }

  public findById(id: number) {
    return prisma.quiz.findUnique({
      where: { id },
      include: { questions: true },
    });
  }

  public create(data: IQuizCreate) {
    return prisma.quiz.create({
      data: {
        title: data.title,
        questions: {
          create: data.questions.map((q) => ({
            text: q.text,
            type: q.type,
            options: q.options ? JSON.stringify(q.options) : null,
            answer: q.answer ?? null,
          })),
        },
      },
      include: { questions: true },
    });
  }

  public delete(id: number) {
    return prisma.quiz.delete({ where: { id } });
  }
}

export const quizzesRepository = new QuizzesRepository();
