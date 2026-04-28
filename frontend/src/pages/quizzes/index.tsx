import { useEffect, useState } from 'react';
import { Quiz } from '../../types';
import { getQuizzes, deleteQuiz } from '../../services/api';
import Layout from '../../components/Layout';
import QuizCard from '../../components/QuizCard';

export default function QuizList() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getQuizzes().then((data) => {
      setQuizzes(data);
      setLoading(false);
    });
  }, []);

  const handleDelete = async (id: number) => {
    await deleteQuiz(id);
    setQuizzes((prev) => prev.filter((q) => q.id !== id));
  };

  if (loading) {
    return (
      <Layout title="Quizzes">
        <div className="flex items-center justify-center h-64">
          <div className="text-purple-400 animate-pulse text-lg">
            Loading quizzes...
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Quizzes">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-1">Your Quizzes</h1>
        <p className="text-slate-400">
          {quizzes.length} quiz{quizzes.length !== 1 ? 'zes' : ''} available
        </p>
      </div>

      {quizzes.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl">
          <p className="text-4xl mb-4">📝</p>
          <p className="text-slate-400 mb-6">
            No quizzes yet. Create your first one!
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {quizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </Layout>
  );
}
