
import { prisma } from "../config/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const listMentors = asyncHandler(async (_req, res) => {
  const mentors = await prisma.user.findMany({
    where: { role: "MENTOR" },
    select: {
      id: true,
      name: true,
      email: true,
      mentorProfile: true,
    },
  });

  res.json({ mentors });
});

export const myStudents = asyncHandler(async (req, res) => {
  const students = await prisma.studentProfile.findMany({
    where: { mentorId: req.user.id },
    include: {
      user: {
        select: { id: true, name: true, email: true },
      },
    },
  });

  res.json({ students });
});

export const assignStudent = asyncHandler(async (req, res) => {
  const { studentId } = req.params;

  const student = await prisma.studentProfile.findUnique({
    where: { id: studentId },
  });

  if (!student) {
    return res.status(404).json({
      message: "Student profile not found",
    });
  }

  if (student.mentorId && student.mentorId !== req.user.id) {
    return res.status(409).json({
      message: "Student is already assigned to another mentor",
    });
  }

  const updatedStudent = await prisma.studentProfile.update({
    where: { id: studentId },
    data: { mentorId: req.user.id },
    include: {
      user: {
        select: { id: true, name: true, email: true },
      },
    },
  });

  res.json({
    message: "Student assigned successfully",
    student: updatedStudent,
  });
});

export const getStudentGoals = asyncHandler(async (req, res) => {
  const { studentId } = req.params;

  const student = await prisma.studentProfile.findFirst({
    where: {
      id: studentId,
      mentorId: req.user.id,
    },
    select: {
      userId: true,
    },
  });

  if (!student) {
    return res.status(404).json({
      message: "Assigned student not found",
    });
  }

  const goals = await prisma.goal.findMany({
    where: {
      studentId: student.userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  res.json({ goals });
});
