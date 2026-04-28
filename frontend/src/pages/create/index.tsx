import { useState } from 'react';
import { useRouter } from 'next/router';
import { CreateQuestionDto } from '../../types';
import { createQuiz } from '../../services/api';
import Layout from '../../components/Layout';
import QuestionFormField from '../../components/QuestionFormField';

interface QuestionForm extends CreateQuestionDto {
  optionsInput?: string;
  correctOptions?: string[];
}

const emptyQuestion = (): QuestionForm => ({
  text: '',
  type: 'BOOLEAN',
  optionsInput: '',
  answer: '',
  correctOptions: [],
});

export default function CreateQuiz() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState<QuestionForm[]>([emptyQuestion()]);
  const [loading, setLoading] = useState(false);

  const isFormValid = () => {
    if (!title.trim()) return false;
    if (questions.length === 0) return false;

    return questions.every((q) => {
      if (!q.text.trim()) return false;

      if (q.type === 'BOOLEAN') {
        return q.answer === 'true' || q.answer === 'false';
      }

      if (q.type === 'CHECKBOX') {
        const options =
          q.optionsInput?.split(',').filter((opt) => opt.trim() !== '') || [];
        return options.length > 0 && (q.correctOptions?.length ?? 0) > 0;
      }

      return true;
    });
  };

  const updateQuestion = (
    index: number,
    field: keyof QuestionForm,
    value: any,
  ) => {
    setQuestions((prev) =>
      prev.map((q, i) => (i === index ? { ...q, [field]: value } : q)),
    );
  };

  const toggleCorrectOption = (index: number, option: string) => {
    setQuestions((prev) =>
      prev.map((q, i) => {
        if (i !== index) return q;
        const current = q.correctOptions ?? [];
        const updated = current.includes(option)
          ? current.filter((o) => o !== option)
          : [...current, option];
        return { ...q, correctOptions: updated };
      }),
    );
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      return alert('Please fill in all fields and select correct answers.');
    }

    setLoading(true);
    try {
      const prepared = questions.map((q) => ({
        text: q.text,
        type: q.type,
        options:
          q.type === 'CHECKBOX' && q.optionsInput
            ? q.optionsInput
                .split(',')
                .map((o) => o.trim())
                .filter(Boolean)
            : undefined,
        answer:
          q.type === 'BOOLEAN'
            ? q.answer
            : q.type === 'CHECKBOX'
              ? JSON.stringify(q.correctOptions)
              : undefined,
      }));

      await createQuiz({ title, questions: prepared });
      router.push('/quizzes');
    } catch (error) {
      console.error(error);
      alert('Failed to create quiz');
    } finally {
      setLoading(false);
    }
  };

  const canSubmit = isFormValid() && !loading;

  return (
    <Layout title="Create Quiz">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-1">Create Quiz</h1>
        <p className="text-slate-400">
          Build your quiz with multiple question types
        </p>
      </div>

      <div className="mb-6">
        <label className="block text-slate-400 text-sm font-medium mb-2">
          Quiz Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter quiz title..."
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:bg-purple-500/5 transition-all text-lg"
        />
      </div>

      <div className="space-y-4 mb-6">
        {questions.map((question, index) => (
          <QuestionFormField
            key={index}
            question={question}
            index={index}
            total={questions.length}
            onChange={updateQuestion}
            onToggleCorrect={toggleCorrectOption}
            onRemove={(i) =>
              setQuestions((prev) => prev.filter((_, idx) => idx !== i))
            }
          />
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setQuestions((prev) => [...prev, emptyQuestion()])}
          className="border border-purple-500/50 text-purple-300 px-5 py-3 rounded-xl hover:bg-purple-500/10 transition-all font-medium"
        >
          + Add Question
        </button>
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg 
            ${
              canSubmit
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white hover:shadow-purple-500/25'
                : 'bg-white/5 text-slate-500 cursor-not-allowed border border-white/10'
            }`}
        >
          {loading ? 'Creating...' : 'Create Quiz →'}
        </button>
      </div>
    </Layout>
  );
}
