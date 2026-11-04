
import { apiRequest } from "./api";

export const getGoals = async () => {
  const data = await apiRequest("/goals");
  return data.goals || [];
};

export const createGoal = async (goalData) => {
  return await apiRequest("/goals", {
    method: "POST",
    body: JSON.stringify(goalData),
  });
};

export const updateGoal = async (id, goalData) => {
  return await apiRequest(`/goals/${id}`, {
    method: "PUT",
    body: JSON.stringify(goalData),
  });
};

export const deleteGoal = async (id) => {
  return await apiRequest(`/goals/${id}`, {
    method: "DELETE",
  });
};
