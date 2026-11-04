import { prisma } from "../config/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getProfile = asyncHandler(async (req, res) => {
  const profile = await prisma.studentProfile.findUnique({
    where: { userId: req.user.id },
    include: {
      user: {
        select: { id: true, name: true, email: true },
      },
      mentor: {
        select: { id: true, name: true, email: true },
      },
    },
  });

  res.json({ profile });
});

export const saveProfile = asyncHandler(async (req, res) => {
  const {
    college,
    course,
    semester,
    interests = [],
    guidance = [],
    goal,
    mentoringArea,
  } = req.body;

  const profile = await prisma.studentProfile.upsert({
    where: { userId: req.user.id },
    create: {
      userId: req.user.id,
      college,
      course,
      semester,
      interests: [...new Set([...interests, ...guidance])],
      goal,
      mentoringArea,
    },
    update: {
      college,
      course,
      semester,
      interests: [...new Set([...interests, ...guidance])],
      goal,
      mentoringArea,
    },
  });

  res.json({ profile });
});

export const listStudents = asyncHandler(async (_req, res) => {
  const students = await prisma.studentProfile.findMany({
    include: {
      user: {
        select: { id: true, name: true, email: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  res.json({ students });
});