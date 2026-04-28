import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Quiz, Question } from '../../../types';
import { getQuizById } from '../../../services/api';
import Layout from '../../../components/Layout';
import ResultCard from '../../../components/ResultCard';

interface QuestionResult {
    question: Question;
    userAnswer: any;
    correctAnswer: any;
    isCorrect: boolean | null;
    requiresReview: boolean;
}

export default function QuizResult() {
    const router = useRouter();
    const { id, answers: answersParam } = router.query;
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [results, setResults] = useState<QuestionResult[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id || !answersParam) return;
        getQuizById(Number(id)).then((data) => {
            setQuiz(data);
            const answers = JSON.parse(decodeURIComponent(answersParam as string));
            const computed: QuestionResult[] = (data.questions ?? []).map((q: Question) => {
                const userAnswer = answers[q.id];
                if (q.type === 'INPUT') return { question: q, userAnswer, correctAnswer: null, isCorrect: null, requiresReview: true };
                if (q.type === 'BOOLEAN') return { question: q, userAnswer, correctAnswer: q.answer, isCorrect: userAnswer === q.answer, requiresReview: false };
                if (q.type === 'CHECKBOX') {
                    let correctAnswer: string[] = [];
                    try { correctAnswer = q.answer ? JSON.parse(q.answer) : []; } catch { correctAnswer = []; }
                    const userArr: string[] = userAnswer ?? [];
                    const isCorrect = correctAnswer.length === userArr.length && correctAnswer.every((o) => userArr.includes(o));
                    return { question: q, userAnswer: userArr, correctAnswer, isCorrect, requiresReview: false };
                }
                return { question: q, userAnswer, correctAnswer: null, isCorrect: null, requiresReview: true };
            });
            setResults(computed);
            setLoading(false);
        });
    }, [id, answersParam]);

    if (loading) {
        return (
            <Layout>
                <div className="flex items-center justify-center h-64">
                    <div className="text-purple-400 animate-pulse text-lg">Calculating results...</div>
                </div>
            </Layout>
        );
    }

    if (!quiz) return <Layout><div className="text-center text-slate-400 py-20">Quiz not found</div></Layout>;

    const gradable = results.filter((r) => !r.requiresReview);
    const correct = gradable.filter((r) => r.isCorrect).length;
    const percentage = gradable.length > 0 ? Math.round((correct / gradable.length) * 100) : null;
    const hasReview = results.some((r) => r.requiresReview);

    return (
        <Layout title="Results">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-6">{quiz.title}</h1>

                {gradable.length > 0 && (
                    <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-6 mb-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-400 text-sm mb-1">Your score</p>
                                <p className="text-4xl font-bold text-white">
                                    {correct}
                                    <span className="text-slate-400 text-2xl"> / {gradable.length}</span>
                                </p>
                                {hasReview && (
                                    <p className="text-slate-400 text-xs mt-2">
                                        * Open-ended questions require manual review
                                    </p>
                                )}
                            </div>
                            {percentage !== null && (
                                <div className="text-right">
                                    <p className="text-5xl font-bold text-purple-300">{percentage}%</p>
                                    <p className="text-slate-400 text-sm mt-1">
                                        {percentage >= 80 ? '🎉 Excellent!' : percentage >= 60 ? '👍 Good job!' : '📚 Keep studying!'}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <div className="space-y-4 mb-8">
                {results.map((result, index) => (
                    <ResultCard key={result.question.id} result={result} index={index} />
                ))}
            </div>

            <div className="flex gap-3">
                <Link
                    href={`/quizzes/${id}`}
                    className="flex-1 text-center border border-purple-500/50 text-purple-300 px-4 py-3 rounded-xl hover:bg-purple-500/10 transition-all font-medium"
                >
                    Try Again
                </Link>
                <Link
                    href="/quizzes"
                    className="flex-1 text-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-4 py-3 rounded-xl transition-all font-medium hover:shadow-lg hover:shadow-purple-500/25"
                >
                    Back to Quizzes
                </Link>
            </div>
        </Layout>
    );
}