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

export { students, addStudent, getStudent };
