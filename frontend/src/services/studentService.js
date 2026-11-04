
import { apiRequest } from "./api";

export const getStudentProfile = async () => {
  return apiRequest("/students/profile");
};

export const saveStudentProfile = async (profileData) => {
  return apiRequest("/students/profile", {
    method: "PUT",
    body: JSON.stringify(profileData),
  });
};
