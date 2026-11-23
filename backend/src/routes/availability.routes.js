import { Router } from "express";

import {
  getMyAvailability,
  createAvailability,
  deleteAvailability,
} from "../controllers/availability.controller.js";

import {
  requireAuth,
  allowRoles,
} from "../middleware/auth.middleware.js";

const router = Router();

router.use(requireAuth);
router.use(allowRoles("STUDENT", "MENTOR", "ALUMNI"));

// Get logged-in user's availability
router.get("/", getMyAvailability);

// Add an availability slot
router.post("/", createAvailability);

// Delete an availability slot
router.delete("/:id", deleteAvailability);

export default router;