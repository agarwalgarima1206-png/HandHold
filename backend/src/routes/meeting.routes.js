
import { Router } from "express";

import {
  createMeeting,
  listMeetings,
  updateMeeting,
} from "../controllers/meeting.controller.js";

import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

router.use(requireAuth);

router.get("/", listMeetings);
router.post("/", createMeeting);
router.patch("/:id", updateMeeting);

export default router;
