import { apiRequest } from "./api";

// Get logged-in Alumni profile
export const getAlumniProfile = async () => {
  return apiRequest("/alumni/profile");
};

// Save or update Alumni profile
export const saveAlumniProfile = async (profileData) => {
  return apiRequest("/alumni/profile", {
    method: "PUT",
    body: JSON.stringify(profileData),
  });
};

// Get all registered Alumni
export const getAlumniList = async () => {
  return apiRequest("/alumni");
};