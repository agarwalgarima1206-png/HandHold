import { Router } from "express";

import {
  getProfile,
  saveProfile,
  listAlumni,
} from "../controllers/alumni.controller.js";

import {
  requireAuth,
  allowRoles,
} from "../middleware/auth.middleware.js";

const router = Router();

// Get logged-in Alumni profile
router.get(
  "/profile",
  requireAuth,
  allowRoles("ALUMNI"),
  getProfile
);

// Create or update Alumni profile
router.put(
  "/profile",
  requireAuth,
  allowRoles("ALUMNI"),
  saveProfile
);

// Get Alumni directory (Student and Mentor access)
router.get(
  "/",
  requireAuth,
  allowRoles("STUDENT", "MENTOR", "ALUMNI"),
  listAlumni
);

export default router;