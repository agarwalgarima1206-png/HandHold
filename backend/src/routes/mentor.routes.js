
import { Router } from "express";

import {
  listMentors,
  myStudents,
  assignStudent,
  getStudentGoals,
} from "../controllers/mentor.controller.js";

import {
  requireAuth,
  allowRoles,
} from "../middleware/auth.middleware.js";

const r = Router();

r.get("/", requireAuth, listMentors);

// Get assigned students
r.get(
  "/students",
  requireAuth,
  allowRoles("MENTOR"),
  myStudents
);

// Assign a student
r.put(
  "/students/:studentId/assign",
  requireAuth,
  allowRoles("MENTOR"),
  assignStudent
);

// Get goals of an assigned student
r.get(
  "/students/:studentId/goals",
  requireAuth,
  allowRoles("MENTOR"),
  getStudentGoals
);

export default r;
