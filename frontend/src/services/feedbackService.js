import { apiRequest } from "./api";

export const submitFeedback = async ({ rating, comment = "" }) => {
  return apiRequest("/feedback", {
    method: "POST",
    body: JSON.stringify({ rating, comment }),
  });
};
