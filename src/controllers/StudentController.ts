import { Request, Response } from 'express';
import { students, addStudent, getStudent } from '../models/StudentModel';

function getAllStudents(req: Request, res: Response): void {
  res.json(students);
}

function createNewStudent(req: Request, res: Response): void {
  const studentData = req.body as NewStudentRequest;
  const didAddStudent = addStudent(studentData);

  if (!didAddStudent) {
    console.log('student with the same name already exists');
    res.sendStatus(409);
    return;
  }

  console.log('New Student created');
  res.sendStatus(201);
}

function getStudentByName(req: Request, res: Response): void {
  const { studentName } = req.params as StudentNameParams;
  const student = getStudent(studentName);

  if (!student) {
    console.log('Student not found');
    res.sendStatus(404);
    return;
  }
  // student did exist
  res.json(student);
}

export { getAllStudents, createNewStudent, getStudentByName };
