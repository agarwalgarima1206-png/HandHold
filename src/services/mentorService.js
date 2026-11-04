
import { apiRequest } from "./api";

export const getStudentDirectory = async () => {
  const data = await apiRequest("/students");
  return data.students || [];
};

export const getMyStudents = async () => {
  const data = await apiRequest("/mentors/students");
  return data.students || [];
};

export const assignStudent = async (studentId) => {
  return await apiRequest(`/mentors/students/${studentId}/assign`, {
    method: "PUT",
  });
};

export const getStudentGoals = async (studentId) => {
  const data = await apiRequest(
    `/mentors/students/${studentId}/goals`
  );
  return data.goals || [];
};
