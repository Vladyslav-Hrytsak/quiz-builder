import Link from 'next/link';
import { Quiz } from '../types';

interface Props {
  quiz: Quiz;
  onDelete: (id: number) => void;
}

export default function QuizCard({ quiz, onDelete }: Props) {
  return (
    <div className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
      <Link href={`/quizzes/${quiz.id}`} className="block">
        {/* Добавлено pr-10, чтобы текст не залезал под кнопку удаления при наведении */}
        <div className="flex items-start justify-between mb-3 pr-10">
          <h2 className="text-white font-semibold text-lg group-hover:text-purple-300 transition-colors truncate mr-2">
            {quiz.title}
          </h2>
          <span className="shrink-0 bg-purple-500/20 text-purple-300 text-xs font-medium px-2.5 py-1 rounded-full border border-purple-500/30">
            {quiz.questionCount} Q
          </span>
        </div>
        <p className="text-slate-400 text-sm">
          {quiz.questionCount} question{quiz.questionCount !== 1 ? 's' : ''} ·
          Click to start
        </p>
      </Link>

      <button
        onClick={() => onDelete(quiz.id)}
        className="absolute top-5 right-4 opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 transition-all duration-200 p-1.5 rounded-lg hover:bg-red-400/10 z-10"
        title="Delete quiz"
      >
        <span role="img" aria-label="delete">
          🗑
        </span>
      </button>
    </div>
  );
}
