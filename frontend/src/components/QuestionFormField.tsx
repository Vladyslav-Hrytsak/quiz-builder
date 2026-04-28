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

            <input
                type="text"
                value={question.text}
                onChange={(e) => onChange(index, 'text', e.target.value)}
                placeholder="Enter question..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:bg-purple-500/5 transition-all mb-4"
            />

            <select
                value={question.type}
                onChange={(e) => onChange(index, 'type', e.target.value as QuestionType)}
                className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-slate-300 focus:outline-none focus:border-purple-500 transition-all mb-4"
            >
                <option value="BOOLEAN">True / False</option>
                <option value="INPUT">Short Text</option>
                <option value="CHECKBOX">Multiple Choice</option>
            </select>

            {question.type === 'BOOLEAN' && (
                <div>
                    <p className="text-slate-400 text-sm mb-2">Correct answer:</p>
                    <div className="flex gap-3">
                        {['true', 'false'].map((val) => (
                            <label
                                key={val}
                                className={`flex items-center gap-2 cursor-pointer px-4 py-2.5 rounded-xl border transition-all duration-200 ${
                                    question.answer === val
                                        ? 'bg-purple-500/20 border-purple-500 text-purple-300'
                                        : 'border-white/10 text-slate-400 hover:border-white/30'
                                }`}
                            >
                                <input
                                    type="radio"
                                    name={`boolean-${index}`}
                                    value={val}
                                    checked={question.answer === val}
                                    onChange={() => onChange(index, 'answer', val)}
                                    className="accent-purple-500"
                                />
                                {val === 'true' ? '✓ True' : '✗ False'}
                            </label>
                        ))}
                    </div>
                </div>
            )}

            {question.type === 'CHECKBOX' && (
                <div>
                    <input
                        type="text"
                        value={question.optionsInput}
                        onChange={(e) => onChange(index, 'optionsInput', e.target.value)}
                        placeholder="Option 1, Option 2, Option 3"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-all mb-3"
                    />
                    {question.optionsInput && (
                        <div>
                            <p className="text-slate-400 text-sm mb-2">Mark correct answers:</p>
                            <div className="space-y-2">
                                {question.optionsInput
                                    .split(',')
                                    .map((o) => o.trim())
                                    .filter(Boolean)
                                    .map((option, i) => (
                                        <label
                                            key={i}
                                            className={`flex items-center gap-3 cursor-pointer px-4 py-2.5 rounded-xl border transition-all duration-200 ${
                                                question.correctOptions?.includes(option)
                                                    ? 'bg-purple-500/20 border-purple-500 text-purple-300'
                                                    : 'border-white/10 text-slate-400 hover:border-white/30'
                                            }`}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={question.correctOptions?.includes(option) ?? false}
                                                onChange={() => onToggleCorrect(index, option)}
                                                className="accent-purple-500"
                                            />
                                            {option}
                                        </label>
                                    ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}