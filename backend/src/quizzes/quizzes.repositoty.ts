import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const quizzesRepository = {
    findAll() {
        return prisma.quiz.findMany({
            include: { questions: true },
        });
    },

    findById(id: number) {
        return prisma.quiz.findUnique({
            where: { id },
            include: { questions: true },
        });
    },

    create(data: { title: string; questions: { text: string; type: string; options?: string; answer?: string }[] }) {
        return prisma.quiz.create({
            data: {
                title: data.title,
                questions: {
                    create: data.questions,
                },
            },
            include: { questions: true },
        });
    },

    delete(id: number) {
        return prisma.quiz.delete({ where: { id } });
    },
};