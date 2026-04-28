import { Question } from '../types';

interface Props {
    question: Question;
    index: number;
    answer: any;
    onBooleanChange: (id: number, value: string) => void;
    onCheckboxChange: (id: number, option: string) => void;
    onInputChange: (id: number, value: string) => void;
}

export default function QuestionField({
                                          question,
                                          index,
                                          answer,
                                          onBooleanChange,
                                          onCheckboxChange,
                                          onInputChange,
                                      }: Props) {
    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-200">
            <p className="text-white font-medium mb-4">
                <span className="text-purple-400 font-bold mr-2">{index + 1}.</span>
                {question.text}
            </p>

            {question.type === 'BOOLEAN' && (
                <div className="flex gap-3">
                    {['true', 'false'].map((val) => (
                        <label
                            key={val}
                            className={`flex items-center gap-2 cursor-pointer px-4 py-2.5 rounded-xl border transition-all duration-200 ${
                                answer === val
                                    ? 'bg-purple-500/20 border-purple-500 text-purple-300'
                                    : 'border-white/10 text-slate-400 hover:border-white/30'
                            }`}
                        >
                            <input
                                type="radio"
                                name={`q-${question.id}`}
                                value={val}
                                checked={answer === val}
                                onChange={() => onBooleanChange(question.id, val)}
                                className="accent-purple-500"
                            />
                            {val === 'true' ? '✓ True' : '✗ False'}
                        </label>
                    ))}
                </div>
            )}

            {question.type === 'INPUT' && (
                <input
                    type="text"
                    value={answer ?? ''}
                    onChange={(e) => onInputChange(question.id, e.target.value)}
                    placeholder="Your answer..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:bg-purple-500/5 transition-all"
                />
            )}

            {question.type === 'CHECKBOX' && question.options && (
                <div className="space-y-2">
                    {question.options.map((option: string, i: number) => (
                        <label
                            key={i}
                            className={`flex items-center gap-3 cursor-pointer px-4 py-2.5 rounded-xl border transition-all duration-200 ${
                                (answer ?? []).includes(option)
                                    ? 'bg-purple-500/20 border-purple-500 text-purple-300'
                                    : 'border-white/10 text-slate-400 hover:border-white/30'
                            }`}
                        >
                            <input
                                type="checkbox"
                                checked={(answer ?? []).includes(option)}
                                onChange={() => onCheckboxChange(question.id, option)}
                                className="accent-purple-500"
                            />
                            {option}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}