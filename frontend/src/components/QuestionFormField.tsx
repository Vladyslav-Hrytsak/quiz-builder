import { useEffect } from 'react';
import { QuestionType } from '../types';

interface QuestionForm {
  text: string;
  type: QuestionType;
  optionsInput?: string;
  answer?: string;
  correctOptions?: string[];
}

interface Props {
  question: QuestionForm;
  index: number;
  total: number;
  onChange: (index: number, field: keyof QuestionForm, value: any) => void;
  onToggleCorrect: (index: number, option: string) => void;
  onRemove: (index: number) => void;
}

export default function QuestionFormField({
  question,
  index,
  total,
  onChange,
  onToggleCorrect,
  onRemove,
}: Props) {
  useEffect(() => {
    if (
      question.type === 'CHECKBOX' &&
      question.optionsInput &&
      question.correctOptions
    ) {
      const currentOptions = question.optionsInput
        .split(',')
        .map((o) => o.trim())
        .filter(Boolean);

      const validCorrectOptions = question.correctOptions.filter((opt) =>
        currentOptions.includes(opt),
      );

      if (validCorrectOptions.length !== question.correctOptions.length) {
        onChange(index, 'correctOptions', validCorrectOptions);
      }
    }
  }, [question.optionsInput, question.type]);

  const getCleanOptions = () => {
    return (question.optionsInput || '')
      .split(',')
      .map((o) => o.trim())
      .filter(Boolean);
  };

  const options = getCleanOptions();

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-200">
      <div className="flex justify-between items-center mb-4">
        <span className="text-purple-400 font-semibold text-sm uppercase tracking-wider">
          Question {index + 1}
        </span>
        {total > 1 && (
          <button
            onClick={() => onRemove(index)}
            className="text-slate-500 hover:text-red-400 text-sm transition-colors px-3 py-1 rounded-lg hover:bg-red-400/10"
          >
            Remove
          </button>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-slate-500 text-xs mb-1 ml-1">
          Question Text
        </label>
        <input
          type="text"
          value={question.text}
          onChange={(e) => onChange(index, 'text', e.target.value)}
          placeholder="e.g. What is the capital of France?"
          className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-all ${
            !question.text.trim() ? 'border-white/10' : 'border-green-500/30'
          }`}
        />
      </div>

      <div className="mb-4">
        <label className="block text-slate-500 text-xs mb-1 ml-1">
          Question Type
        </label>
        <select
          value={question.type}
          onChange={(e) =>
            onChange(index, 'type', e.target.value as QuestionType)
          }
          className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-slate-300 focus:outline-none focus:border-purple-500 transition-all"
        >
          <option value="BOOLEAN">True / False</option>
          <option value="INPUT">Short Text (Manual Review)</option>
          <option value="CHECKBOX">Multiple Choice</option>
        </select>
      </div>

      {question.type === 'BOOLEAN' && (
        <div className="animate-fadeIn mt-4 p-4 bg-white/5 rounded-xl border border-white/5">
          <p className="text-slate-400 text-sm mb-3">
            Select the correct answer:
          </p>
          <div className="flex gap-3">
            {['true', 'false'].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => onChange(index, 'answer', val)}
                className={`flex-1 py-3 rounded-xl border transition-all font-medium ${
                  question.answer === val
                    ? 'bg-purple-600 border-purple-400 text-white shadow-lg shadow-purple-500/20'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
                }`}
              >
                {val === 'true' ? '✓ True' : '✗ False'}
              </button>
            ))}
          </div>
        </div>
      )}

      {question.type === 'CHECKBOX' && (
        <div className="animate-fadeIn mt-4 space-y-4">
          <div>
            <label className="block text-slate-500 text-xs mb-1 ml-1">
              Options (separated by commas)
            </label>
            <input
              type="text"
              value={question.optionsInput}
              onChange={(e) => onChange(index, 'optionsInput', e.target.value)}
              placeholder="Paris, London, Berlin, Rome"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-all"
            />
          </div>

          {options.length > 0 && (
            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
              <p className="text-slate-400 text-sm mb-3">
                Mark correct answers (one or more):
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {options.map((option, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => onToggleCorrect(index, option)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all text-left ${
                      question.correctOptions?.includes(option)
                        ? 'bg-purple-600 border-purple-400 text-white shadow-lg shadow-purple-500/20'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                        question.correctOptions?.includes(option)
                          ? 'bg-white border-white'
                          : 'border-white/20'
                      }`}
                    >
                      {question.correctOptions?.includes(option) && (
                        <span className="text-purple-600 text-xs">✓</span>
                      )}
                    </div>
                    <span className="truncate flex-1">{option}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {question.type === 'INPUT' && (
        <div className="mt-4 bg-blue-500/5 border border-blue-500/20 rounded-xl p-4 flex gap-3 items-start">
          <span className="text-blue-400 mt-0.5">ℹ️</span>
          <p className="text-blue-300/80 text-sm leading-relaxed">
            Short text answers don't need a predefined "correct" answer. You'll
            review these manually after the student finishes the quiz.
          </p>
        </div>
      )}
    </div>
  );
}
