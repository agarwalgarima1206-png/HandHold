
import { apiRequest } from "./api";

// Fetch all registered student profiles
export const getStudentDirectory = async () => {
  const data = await apiRequest("/students");
  return data.students || [];
};

// Fetch students assigned to logged-in mentor
export const getMyStudents = async () => {
  const data = await apiRequest("/mentors/students");
  return data.students || [];
};

// Assign a student to logged-in mentor
export const assignStudent = async (studentId) => {
  return await apiRequest(`/mentors/students/${studentId}/assign`, {
    method: "PUT",
  });
};

// Fetch goals of an assigned student
export const getStudentGoals = async (studentId) => {
  const data = await apiRequest(`/mentors/students/${studentId}/goals`);
  return data.goals || [];
};
