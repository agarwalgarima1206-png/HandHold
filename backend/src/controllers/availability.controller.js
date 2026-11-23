import { prisma } from "../config/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Get availability of logged-in user
export const getMyAvailability = asyncHandler(async (req, res) => {
  const availability = await prisma.availability.findMany({
    where: {
      userId: req.user.id,
    },
    orderBy: {
      startAt: "asc",
    },
  });

  res.json({ availability });
});

// Add an availability slot
export const createAvailability = asyncHandler(async (req, res) => {
  const { startAt, endAt } = req.body;

  if (!startAt || !endAt) {
    return res.status(400).json({
      message: "Start time and end time are required",
    });
  }

  const start = new Date(startAt);
  const end = new Date(endAt);

  if (
    Number.isNaN(start.getTime()) ||
    Number.isNaN(end.getTime())
  ) {
    return res.status(400).json({
      message: "Invalid date or time",
    });
  }

  if (start <= new Date()) {
    return res.status(400).json({
      message: "Availability must be in the future",
    });
  }

  if (end <= start) {
    return res.status(400).json({
      message: "End time must be after start time",
    });
  }

  // Prevent overlapping availability slots
  const overlapping = await prisma.availability.findFirst({
    where: {
      userId: req.user.id,
      startAt: { lt: end },
      endAt: { gt: start },
      isAvailable: true,
    },
  });

  if (overlapping) {
    return res.status(409).json({
      message: "This time overlaps with an existing availability slot",
    });
  }

  const availability = await prisma.availability.create({
    data: {
      userId: req.user.id,
      startAt: start,
      endAt: end,
      isAvailable: true,
    },
  });

  res.status(201).json({
    message: "Availability added successfully",
    availability,
  });
});

// Delete an availability slot
export const deleteAvailability = asyncHandler(async (req, res) => {
  const availability = await prisma.availability.findFirst({
    where: {
      id: req.params.id,
      userId: req.user.id,
    },
  });

  if (!availability) {
    return res.status(404).json({
      message: "Availability slot not found",
    });
  }

  await prisma.availability.delete({
    where: {
      id: availability.id,
    },
  });

  res.json({
    message: "Availability deleted successfully",
  });
});