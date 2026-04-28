import axios from 'axios';
import { Quiz, CreateQuizDto } from '../types';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3002',
  headers: { 'Content-Type': 'application/json' },
});

export const getQuizzes = async (): Promise<Quiz[]> => {
  const res = await api.get('/quizzes');
  return res.data;
};

export const getQuizById = async (id: number): Promise<Quiz> => {
  const res = await api.get(`/quizzes/${id}`);
  return res.data;
};

export const createQuiz = async (data: CreateQuizDto): Promise<Quiz> => {
  const res = await api.post('/quizzes', data);
  return res.data;
};

export const deleteQuiz = async (id: number): Promise<void> => {
  await api.delete(`/quizzes/${id}`);
};
