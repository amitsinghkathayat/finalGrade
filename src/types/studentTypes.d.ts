type EachCourseGrade = {
  courseName: string;
  weight: number;
  grade: number;
};

type AssignmentWeights = Array<EachCourseGrade>;

type CourseGrades = {
  assignmentWeights: AssignmentWeights;
  finalExamWeight: number;
};

type Student = {
  name: string;
  weights: CourseGrades;
  currentAverage: number;
};

type NewStudentRequest = {
  name: string;
  weights: CourseGrades;
};

type AssignmentGrade = {
  grade: number;
};

type FinalGrade = {
  overallScore: number;
  letterGrade: string;
};

type FinalExamScores = {
  neededForA: number;
  neededForB: number;
  neededForC: number;
};

type StudentManager = Record<string, Student>;

type StudentNameParams = {
  studentName: string;
};
