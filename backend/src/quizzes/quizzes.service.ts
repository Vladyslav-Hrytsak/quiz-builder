import { quizzesRepository } from './quizzes.repositoty';

export const quizzesService = {
    async getAll() {
        const quizzes = await quizzesRepository.findAll();
        return quizzes.map((q) => ({
            id: q.id,
            title: q.title,
            createdAt: q.createdAt,
            questionCount: q.questions.length,
        }));
    },

    async getById(id: number) {
        const quiz = await quizzesRepository.findById(id);
        if (!quiz) return null;
        return {
            ...quiz,
            questions: quiz.questions.map((q) => ({
                ...q,
                options: q.options ? JSON.parse(q.options) : null,
            })),
        };
    },

    async create(data: any) {
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
    },

    async delete(id: number) {
        return quizzesRepository.delete(id);
    },
};