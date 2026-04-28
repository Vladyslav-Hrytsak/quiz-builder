import { PrismaClient } from '@prisma/client';

class QuizzesRepository {
    private prisma = new PrismaClient();

    public findAll() {
        return this.prisma.quiz.findMany({
            include: { questions: true },
        });
    }

    public findById(id: number) {
        return this.prisma.quiz.findUnique({
            where: { id },
            include: { questions: true },
        });
    }

    public create(data: {
        title: string;
        questions: {
            text: string;
            type: string;
            options?: string;
            answer?: string;
        }[];
    }) {
        return this.prisma.quiz.create({
            data: {
                title: data.title,
                questions: {
                    create: data.questions,
                },
            },
            include: { questions: true },
        });
    }

    public delete(id: number) {
        return this.prisma.quiz.delete({ where: { id } });
    }
}

export const quizzesRepository = new QuizzesRepository();