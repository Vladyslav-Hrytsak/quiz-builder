import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Quiz, Question } from '../../types';
import { getQuizById } from '../../services/api';
import Layout from '../../components/Layout';
import QuestionField from '../../components/QuestionField';

export default function QuizDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [loading, setLoading] = useState(true);
    const [answers, setAnswers] = useState<Record<number, any>>({});

    useEffect(() => {
        if (!id) return;
        getQuizById(Number(id)).then((data) => {
            setQuiz(data);
            setLoading(false);
        });
    }, [id]);

    const handleSubmit = () => {
        if (!quiz) return;
        const unanswered = quiz.questions?.filter((q) => {
            if (q.type === 'INPUT') return false;
            return !answers[q.id];
        });
        if (unanswered && unanswered.length > 0) {
            alert('Please answer all questions before submitting');
            return;
        }
        const encoded = encodeURIComponent(JSON.stringify(answers));
        router.push(`/quizzes/${id}/result?answers=${encoded}`);
    };

    if (loading) {
        return (
            <Layout>
                <div className="flex items-center justify-center h-64">
                    <div className="text-purple-400 animate-pulse text-lg">Loading...</div>
                </div>
            </Layout>
        );
    }

    if (!quiz) {
        return (
            <Layout>
                <div className="text-center text-slate-400 py-20">Quiz not found</div>
            </Layout>
        );
    }

    return (
        <Layout title={quiz.title}>
            <Link href="/quizzes" className="text-purple-400 hover:text-purple-300 text-sm mb-6 inline-flex items-center gap-1 transition-colors">
                ← Back to quizzes
            </Link>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-1">{quiz.title}</h1>
                <p className="text-slate-400">{quiz.questions?.length} questions</p>
            </div>

            <div className="space-y-4 mb-8">
                {quiz.questions?.map((question: Question, index: number) => (
                    <QuestionField
                        key={question.id}
                        question={question}
                        index={index}
                        answer={answers[question.id]}
                        onBooleanChange={(id, val) => setAnswers((prev) => ({ ...prev, [id]: val }))}
                        onCheckboxChange={(id, option) =>
                            setAnswers((prev) => {
                                const current: string[] = prev[id] ?? [];
                                const updated = current.includes(option)
                                    ? current.filter((o) => o !== option)
                                    : [...current, option];
                                return { ...prev, [id]: updated };
                            })
                        }
                        onInputChange={(id, val) => setAnswers((prev) => ({ ...prev, [id]: val }))}
                    />
                ))}
            </div>

            <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white py-4 rounded-2xl font-semibold text-lg transition-all duration-200 hover:shadow-xl hover:shadow-purple-500/25"
            >
                Submit Quiz →
            </button>
        </Layout>
    );
}