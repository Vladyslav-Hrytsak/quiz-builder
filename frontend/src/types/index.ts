export type QuestionType = 'BOOLEAN' | 'INPUT' | 'CHECKBOX';

export interface Question {
  id: number;
  text: string;
  type: QuestionType;
  options: string[] | null;
  answer: string | null;
  quizId: number;
}

export interface Quiz {
  id: number;
  title: string;
  createdAt: string;
  questionCount?: number;
  questions?: Question[];
}

export interface CreateQuestionDto {
  text: string;
  type: QuestionType;
  options?: string[];
  answer?: string;
}

export interface CreateQuizDto {
  title: string;
  questions: CreateQuestionDto[];
}
