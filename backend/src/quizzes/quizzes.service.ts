import { quizzesRepository } from './quizzes.repositoty';

class QuizzesService {
    public async getAll() {
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

    public async create(data: any) {
        const prepared = {
            title: data.title,
            questions: data.questions.map((q: any) => ({
                text: q.text,
                type: q.type,
                options: q.options ? JSON.stringify(q.options) : null,
                answer: q.answer ?? null,
            })),
        };
        return quizzesRepository.create(prepared);
    }

    public async delete(id: number) {
        return quizzesRepository.delete(id);
    }
}

export const quizzesService = new QuizzesService();