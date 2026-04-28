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
  const [isReadOnly, setIsReadOnly] = useState(true);

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
      const ans = answers[q.id];
      if (q.type === 'CHECKBOX') return !ans || ans.length === 0;
      return ans === undefined || ans === null || ans === '';
    });

    if (unanswered && unanswered.length > 0) {
      alert('Please answer all questions before submitting');
      return;
    }

    const storageKey = `quiz_answers_${id}`;
    localStorage.setItem(storageKey, JSON.stringify(answers));
    router.push(`/quizzes/${id}/result`);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-purple-400 animate-pulse text-lg">
            Loading...
          </div>
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <Link
          href="/quizzes"
          className="text-purple-400 hover:text-purple-300 text-sm inline-flex items-center gap-1 transition-colors"
        >
          ← Back to quizzes
        </Link>

        <div className="flex items-center bg-white/5 p-1 rounded-xl border border-white/10 w-full sm:w-auto">
          <button
            onClick={() => setIsReadOnly(true)}
            className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              isReadOnly
                ? 'bg-purple-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Structure (TЗ)
          </button>
          <button
            onClick={() => setIsReadOnly(false)}
            className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              !isReadOnly
                ? 'bg-green-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Solve (Bonus)
          </button>
        </div>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-1">{quiz.title}</h1>
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${isReadOnly ? 'bg-purple-500' : 'bg-green-500'} animate-pulse`}
          />
          <p className="text-slate-400 text-sm">
            {isReadOnly
              ? 'Read-only Structure Mode'
              : 'Interactive Solving Mode'}
          </p>
        </div>
      </div>

      <div
        className={`space-y-4 mb-8 transition-opacity duration-300 ${isReadOnly ? 'opacity-90' : 'opacity-100'}`}
      >
        {quiz.questions?.map((question: Question, index: number) => (
          <div
            key={question.id}
            className={isReadOnly ? 'pointer-events-none select-none' : ''}
          >
            <QuestionField
              question={question}
              index={index}
              answer={answers[question.id]}
              disabled={isReadOnly}
              onBooleanChange={(id, val) =>
                !isReadOnly && setAnswers((prev) => ({ ...prev, [id]: val }))
              }
              onCheckboxChange={(id, option) =>
                !isReadOnly &&
                setAnswers((prev) => {
                  const current: string[] = prev[id] ?? [];
                  const updated = current.includes(option)
                    ? current.filter((o) => o !== option)
                    : [...current, option];
                  return { ...prev, [id]: updated };
                })
              }
              onInputChange={(id, val) =>
                !isReadOnly && setAnswers((prev) => ({ ...prev, [id]: val }))
              }
            />
          </div>
        ))}
      </div>

      {!isReadOnly ? (
        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 text-white py-4 rounded-2xl font-semibold text-lg transition-all duration-200 shadow-lg shadow-green-500/20"
        >
          Submit Results →
        </button>
      ) : (
        <div className="w-full py-4 rounded-2xl border border-dashed border-white/10 text-center text-slate-500 text-sm">
          Switch to "Solve" mode to interact with the quiz
        </div>
      )}
    </Layout>
  );
}
