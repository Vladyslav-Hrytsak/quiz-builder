import { Question } from '../types';

interface QuestionResult {
  question: Question;
  userAnswer: any;
  correctAnswer: any;
  isCorrect: boolean | null;
  requiresReview: boolean;
}

interface Props {
  result: QuestionResult;
  index: number;
}

export default function ResultCard({ result, index }: Props) {
  const getBorderColor = () => {
    if (result.requiresReview) return 'border-yellow-500/40 bg-yellow-500/5';
    if (result.isCorrect) return 'border-green-500/40 bg-green-500/5';
    return 'border-red-500/40 bg-red-500/5';
  };

  return (
    <div
      className={`border rounded-2xl p-6 transition-all ${getBorderColor()}`}
    >
      <p className="text-white font-medium mb-3">
        <span className="text-purple-400 font-bold mr-2">{index + 1}.</span>
        {result.question.text}
      </p>

      <p className="text-sm text-slate-400 mb-2">
        <span className="font-medium text-slate-300">Your answer: </span>
        {Array.isArray(result.userAnswer)
          ? result.userAnswer.join(', ') || '—'
          : result.userAnswer || '—'}
      </p>

      {result.requiresReview ? (
        <span className="inline-flex items-center gap-1.5 text-xs text-yellow-400 font-medium bg-yellow-500/10 px-3 py-1 rounded-full border border-yellow-500/20">
          ✏️ Requires manual review
        </span>
      ) : result.isCorrect ? (
        <span className="inline-flex items-center gap-1.5 text-xs text-green-400 font-medium bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
          ✅ Correct
        </span>
      ) : (
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs text-red-400 font-medium bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
            ❌ Incorrect
          </span>
          <p className="text-sm mt-2 text-slate-400">
            <span className="font-medium text-slate-300">Correct answer: </span>
            {Array.isArray(result.correctAnswer)
              ? result.correctAnswer.join(', ')
              : result.correctAnswer}
          </p>
        </div>
      )}
    </div>
  );
}
