import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { quizzesRouter } from './quizzes/quizzes.router';

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(cors());
app.use(express.json());

app.use('/quizzes', quizzesRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});