import { prisma } from "../config/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Get logged-in Alumni profile
export const getProfile = asyncHandler(async (req, res) => {
  const profile = await prisma.alumniProfile.findUnique({
    where: { userId: req.user.id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  res.json({ profile });
});

// Create or update Alumni profile
export const saveProfile = asyncHandler(async (req, res) => {
  const {
    company,
    jobTitle,
    experience,
    expertise = [],
    bio,
    linkedinUrl,
    location,
  } = req.body;

  const profileData = {
    company,
    jobTitle,
    experience,
    expertise: Array.isArray(expertise) ? expertise : [],
    bio,
    linkedinUrl,
    location,
  };

  const profile = await prisma.alumniProfile.upsert({
    where: {
      userId: req.user.id,
    },
    create: {
      userId: req.user.id,
      ...profileData,
    },
    update: profileData,
  });

  res.json({
    message: "Alumni profile saved successfully",
    profile,
  });
});

// Get all registered Alumni
export const listAlumni = asyncHandler(async (_req, res) => {
  const alumni = await prisma.user.findMany({
    where: {
      role: "ALUMNI",
    },
    select: {
      id: true,
      name: true,
      email: true,
      alumniProfile: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  res.json({ alumni });
});