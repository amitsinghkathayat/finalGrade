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
} from './controllers/StudentController';

const app: Express = express();
const PORT = 8100;

// Enable json request body parsing
app.use(express.json());

app.get('/api/students', getAllStudents);
app.post('/api/students', createNewStudent);
app.get('/api/students/:studentName', getStudentByName);
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
