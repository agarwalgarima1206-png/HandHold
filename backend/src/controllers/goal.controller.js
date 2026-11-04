
import { prisma } from "../config/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Get logged-in student's goals
export const getGoals = asyncHandler(async (req, res) => {
  const goals = await prisma.goal.findMany({
    where: { studentId: req.user.id },
    orderBy: { createdAt: "desc" },
  });

  res.json({ goals });
});

// Create a new goal
export const createGoal = asyncHandler(async (req, res) => {
  const { title, description = "" } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({
      message: "Goal title is required",
    });
  }

  const goal = await prisma.goal.create({
    data: {
      studentId: req.user.id,
      title: title.trim(),
      description,
    },
  });

  res.status(201).json({
    message: "Goal created successfully",
    goal,
  });
});

// Update a goal
export const updateGoal = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  const existingGoal = await prisma.goal.findFirst({
    where: {
      id,
      studentId: req.user.id,
    },
  });

  if (!existingGoal) {
    return res.status(404).json({
      message: "Goal not found",
    });
  }

  if (title !== undefined && !title.trim()) {
    return res.status(400).json({
      message: "Goal title cannot be empty",
    });
  }

  const goal = await prisma.goal.update({
    where: { id },
    data: {
      ...(title !== undefined && { title: title.trim() }),
      ...(description !== undefined && { description }),
      ...(completed !== undefined && { completed }),
    },
  });

  // Notify assigned mentor when student completes a goal
  if (completed === true && !existingGoal.completed) {
    try {
      const studentProfile = await prisma.studentProfile.findUnique({
        where: { userId: req.user.id },
        select: { mentorId: true },
      });

      if (studentProfile?.mentorId) {
        await prisma.notification.create({
          data: {
            userId: studentProfile.mentorId,
            title: "Goal Completed",
            message: `${req.user.name} has completed the goal: ${goal.title}`,
            type: "GOAL",
          },
        });
      }
    } catch (error) {
      console.error("Goal notification error:", error);
    }
  }

  res.json({
    message: "Goal updated successfully",
    goal,
  });
});

// Delete a goal
export const deleteGoal = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existingGoal = await prisma.goal.findFirst({
    where: {
      id,
      studentId: req.user.id,
    },
  });

  if (!existingGoal) {
    return res.status(404).json({
      message: "Goal not found",
    });
  }

  await prisma.goal.delete({
    where: { id },
  });

  res.json({
    message: "Goal deleted successfully",
  });
});
