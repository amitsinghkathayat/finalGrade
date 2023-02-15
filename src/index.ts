/*
 *  index.ts
 *  Project: Did I pass?
 *
 *  Author: Amit Singh Kathayat
 *  Created on: Feb 3, 2023
 */
import express, { Express } from 'express';
import {
  getAllStudents,
  createNewStudent,
  getStudentByName,
  getFinalExamScores,
  calcFinalScore,
  updateGrade,
} from './controllers/StudentController';

const app: Express = express();
const PORT = 8100;

// Enable json request body parsing
app.use(express.json());

app.get('/api/students', getAllStudents);
app.post('/api/students', createNewStudent);
app.get('/api/students/:studentName', getStudentByName);
app.get('/api/students/:studentName/finalExam', getFinalExamScores);
app.post('/api/students/:studentName/finalExam', calcFinalScore);
app.post('/api/students/:studentName/grades/:assignmentName', updateGrade);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
