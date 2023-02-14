import { Request, Response } from 'express';
import {
  students,
  addStudent,
  getStudent,
  calculateFinalExamScore,
  getLetterGrade,
  updateStudentGrade,
} from '../models/StudentModel';

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

function getFinalExamScores(req: Request, res: Response): void {
  // Get the student name from the path params
  const { studentName } = req.params as StudentNameParams;

  const student = getStudent(studentName);

  if (!student) {
    console.log('Student not found');
    res.sendStatus(404);
    return;
  }
  // Get the current average and weights from the student's data
  const { currentAverage, weights } = student;
  const { finalExamWeight } = weights;

  const neededForA = calculateFinalExamScore(currentAverage, finalExamWeight, 90);
  const neededForB = calculateFinalExamScore(currentAverage, finalExamWeight, 80);
  const neededForC = calculateFinalExamScore(currentAverage, finalExamWeight, 70);
  const neededForD = calculateFinalExamScore(currentAverage, finalExamWeight, 60);

  // Send a JSON response with an object containing the grades needed for an A through D
  res.status(200).send({ neededForA, neededForB, neededForC, neededForD });
}

function calcFinalScore(req: Request, res: Response): void {
  const { studentName } = req.params as StudentNameParams;

  const student = getStudent(studentName);

  if (!student) {
    console.log('Student not found');
    res.sendStatus(404);
    return;
  }
  // Get the grade data from the request body as the `AssignmentGrade` type
  const { grade } = req.body as AssignmentGrade;

  const { currentAverage, weights } = student;
  const { finalExamWeight } = weights;

  // Calculate the final score that would receive using their current average
  // and the hypothetical final exam grade.
  const overallScore =
    currentAverage * (1 - finalExamWeight / 100) + grade * (finalExamWeight / 100);
  // Get the letter grade they would receive given this score
  const letterGrade = getLetterGrade(overallScore);

  // Send back a JSON response containing their `overallScore` and `letterGrade.
  res.status(200).send({ overallScore, letterGrade });
}

function updateGrade(req: Request, res: Response): void {
  // Get the student's name and assignment name from the path parameters as a `GradeUpdateParams`
  const { studentName, assignmentName } = req.params as GradeUpdateParams;
  // Get the grade from the request body as an `AssignmentGrade`
  const { grade } = req.body as AssignmentGrade;
  // Update the student's grade
  const didUpdateGrade = updateStudentGrade(studentName, assignmentName, grade);

  if (!didUpdateGrade) {
    console.log('Student or assignment not found!!');
    res.sendStatus(404);

    return;
  }

  console.log('Grade Updated!');
  res.sendStatus(200);
}

export {
  getAllStudents,
  createNewStudent,
  getStudentByName,
  getFinalExamScores,
  calcFinalScore,
  updateGrade,
};
