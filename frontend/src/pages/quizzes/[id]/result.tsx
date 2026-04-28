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
  const { id } = router.query;
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [results, setResults] = useState<QuestionResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const processResults = async () => {
      try {
        const data = await getQuizById(Number(id));
        setQuiz(data);

        const storageKey = `quiz_answers_${id}`;
        const savedAnswers = localStorage.getItem(storageKey);

        if (!savedAnswers) {
          setError('No answers found. Please take the quiz again.');
          setLoading(false);
          return;
        }

        let userAnswers: Record<number, any> = {};
        try {
          userAnswers = JSON.parse(savedAnswers);
        } catch (e) {
          setError('Failed to process your answers.');
          return;
        }

        const computed: QuestionResult[] = (data.questions ?? []).map(
          (q: Question) => {
            const userAnswer = userAnswers[q.id];

            if (q.type === 'INPUT') {
              return {
                question: q,
                userAnswer,
                correctAnswer: null,
                isCorrect: null,
                requiresReview: true,
              };
            }

            if (q.type === 'BOOLEAN') {
              return {
                question: q,
                userAnswer,
                correctAnswer: q.answer,
                isCorrect: String(userAnswer) === String(q.answer),
                requiresReview: false,
              };
            }

            if (q.type === 'CHECKBOX') {
              let correctAnswer: string[] = [];
              try {
                correctAnswer = q.answer ? JSON.parse(q.answer) : [];
              } catch {
                correctAnswer = [];
              }
              const userArr: string[] = Array.isArray(userAnswer)
                ? userAnswer
                : [];
              const isCorrect =
                correctAnswer.length === userArr.length &&
                correctAnswer.every((o) => userArr.includes(o));
              return {
                question: q,
                userAnswer: userArr,
                correctAnswer,
                isCorrect,
                requiresReview: false,
              };
            }

            return {
              question: q,
              userAnswer,
              correctAnswer: null,
              isCorrect: null,
              requiresReview: true,
            };
          },
        );

        setResults(computed);
      } catch (err) {
        console.error('Result processing error:', err);
        setError('Error loading results.');
      } finally {
        setLoading(false);
      }
    };

    processResults();
  }, [id]);

  if (loading)
    return (
      <Layout title="Calculating...">
        <div className="flex items-center justify-center h-64 text-purple-400 animate-pulse font-medium">
          Analyzing your answers...
        </div>
      </Layout>
    );

  if (error || !quiz)
    return (
      <Layout title="Error">
        <div className="text-center py-20 bg-white/5 border border-white/10 rounded-3xl">
          <p className="text-red-400 mb-6">{error || 'Quiz not found'}</p>
          <Link
            href={`/quizzes/${id}`}
            className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-500 transition-all"
          >
            Go Back to Quiz
          </Link>
        </div>
      </Layout>
    );

  const gradable = results.filter((r) => !r.requiresReview);
  const correct = gradable.filter((r) => r.isCorrect).length;
  const percentage =
    gradable.length > 0 ? Math.round((correct / gradable.length) * 100) : null;

  return (
    <Layout title={`Results: ${quiz.title}`}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-6 tracking-tight">
          {quiz.title}
        </h1>

        {gradable.length > 0 && (
          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/10 border border-purple-500/30 rounded-3xl p-8 mb-8 shadow-xl shadow-purple-500/5">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <p className="text-slate-400 text-sm font-medium uppercase tracking-widest mb-1">
                  Total Score
                </p>
                <p className="text-6xl font-black text-white">
                  {correct}
                  <span className="text-slate-500 text-3xl font-light">
                    /{gradable.length}
                  </span>
                </p>
              </div>
              {percentage !== null && (
                <div className="text-center md:text-right">
                  <p className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    {percentage}%
                  </p>
                  <p className="text-slate-300 font-medium mt-1">
                    {percentage >= 80
                      ? '🎉 Exceptional!'
                      : percentage >= 60
                        ? '👍 Well done!'
                        : '📚 Keep practicing!'}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4 mb-10">
        <h3 className="text-white/40 text-xs font-bold uppercase tracking-[0.2em] ml-1">
          Detail Report
        </h3>
        {results.map((result, index) => (
          <ResultCard key={result.question.id} result={result} index={index} />
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href={`/quizzes/${id}`}
          className="flex-1 text-center border border-white/10 text-white px-6 py-4 rounded-2xl hover:bg-white/5 transition-all font-semibold"
        >
          Try Again
        </Link>
        <Link
          href="/quizzes"
          className="flex-1 text-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-6 py-4 rounded-2xl transition-all font-semibold shadow-lg shadow-purple-500/20"
        >
          Finish
        </Link>
      </div>
    </Layout>
  );
}
