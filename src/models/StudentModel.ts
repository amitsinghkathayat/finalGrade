const students: StudentManager = {};

function calculateAverage(weights: CourseGrades): number {
  // check it assignmentWeights exist
  if (!weights.assignmentWeights) {
    return 0;
  }

  let totalScore = 0;
  let totalWeight = 0;
  // loop through all the assignments weights
  for (let i = 0; i < weights.assignmentWeights.length; i += 1) {
    totalWeight += weights.assignmentWeights[i].weight;
    totalScore += weights.assignmentWeights[i].weight * weights.assignmentWeights[i].grade;
  }
  // calculate the average without Final
  const average = totalScore / totalWeight;
  return average;
}

function addStudent(newStudentData: NewStudentRequest): boolean {
  const { name, weights } = newStudentData;
  // the the name is already in students dataset
  if (name in students) {
    return false;
  }
  // Calculate the student's current average (use the function previously defined)
  const currentAverage = calculateAverage(weights);

  const newStudent: Student = { name, weights, currentAverage };
  // Add the new Student to the `students` object. The student's name is the key
  students[name] = newStudent;
  return true;
}

function getStudent(studentName: string): Student | undefined {
  // If the student's name is not in `students`
  if (!(studentName in students)) {
    // then return undefined
    return undefined;
  }
  // Return the student's information (their name is the key for `students`)
  return students[studentName];
}

function calculateFinalExamScore(
  currentAverage: number,
  finalExamWeight: number,
  targetScore: number
): number {
  // Calculate the final exam score needed to get the targetScore in the class
  const totalWeight = 100;
  const currentScore = (currentAverage * (totalWeight - finalExamWeight)) / totalWeight;
  const scoreRequired = targetScore - currentScore;
  const finalExamScore = (scoreRequired * totalWeight) / finalExamWeight;
  return finalExamScore;
}

function getLetterGrade(score: number): string {
  // Return the appropriate letter grade
  if (score >= 90) {
    return 'A';
  }
  if (score >= 80) {
    return 'B';
  }
  if (score >= 70) {
    return 'C';
  }
  if (score >= 60) {
    return 'D';
  }
  return 'F';
}

function updateStudentGrade(
  studentName: string,
  assignmentName: string,
  newGrade: number
): boolean {
  // Get the student's data from the dataset
  const student = getStudent(studentName);
  // If the student was not found return false
  if (!student) {
    return false;
  }
  // Search the student's `assignmentWeights` and find the assignment with the
  // matching name using the .find() method
  const assignment = student.weights.assignmentWeights.find(
    (matchAssignment) => matchAssignment.name === assignmentName
  );
  // If the assignment was not found return false
  if (!assignment) {
    return false;
  }
  // Set the assignment's grade to the newGrade
  assignment.grade = newGrade;

  // recalculate the student's currentAverage
  let totalWeight = 0;
  let totalScore = 0;

  for (let i = 0; i < student.weights.assignmentWeights.length; i += 1) {
    const course = student.weights.assignmentWeights[i];
    totalWeight += course.weight;
    totalScore += course.weight * course.grade;
  }

  totalWeight += student.weights.finalExamWeight;
  student.currentAverage = totalScore / totalWeight;

  return true;
}

export {
  students,
  addStudent,
  getStudent,
  calculateFinalExamScore,
  getLetterGrade,
  updateStudentGrade,
};
