

import { apiRequest } from "./api";

// Fetch meetings for logged-in student or mentor
export const getMeetings = async () => {
  const data = await apiRequest("/meetings");
  return data.meetings || [];
};

// Create a meeting request
export const createMeeting = async (meetingData) => {
  return await apiRequest("/meetings", {
    method: "POST",
    body: JSON.stringify(meetingData),
  });
};

// Update meeting status
export const updateMeeting = async (meetingId, status) => {
  return await apiRequest(`/meetings/${meetingId}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
};
