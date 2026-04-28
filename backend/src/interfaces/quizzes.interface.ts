export type QuestionType = 'boolean' | 'input' | 'checkbox';

export interface IQuestionCreate {
  text: string;
  type: QuestionType;
  options?: string[] | null;
  answer?: string | null;
}

export interface IQuizCreate {
  title: string;
  questions: IQuestionCreate[];
}

export interface IQuizListResponse {
  id: number;
  title: string;
  createdAt: Date;
  questionCount: number;
}
