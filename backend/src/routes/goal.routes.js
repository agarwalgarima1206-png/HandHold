
import { Router } from "express";

import {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
} from "../controllers/goal.controller.js";

import {
  requireAuth,
  allowRoles,
} from "../middleware/auth.middleware.js";

const router = Router();

router.use(requireAuth, allowRoles("STUDENT"));

router.get("/", getGoals);
router.post("/", createGoal);
router.put("/:id", updateGoal);
router.delete("/:id", deleteGoal);

export default router;
