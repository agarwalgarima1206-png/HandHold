
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Generate JWT token
const tokenFor = (user) => {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    }
  );
};

// SIGNUP
export const signup = asyncHandler(async (req, res) => {
  const name = req.body.name?.trim();
  const email = req.body.email?.trim().toLowerCase();
  const password = req.body.password;
  const role = (req.body.role || "STUDENT").toUpperCase();

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Name, email and password are required",
    });
  }

  if (password.length < 8) {
    return res.status(400).json({
      message: "Password must be at least 8 characters",
    });
  }

  if (!["STUDENT", "MENTOR"].includes(role)) {
    return res.status(400).json({
      message: "Invalid role",
    });
  }

  // Check whether email already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return res.status(409).json({
      message: "An account with this email already exists",
    });
  }

  // Hash password
  const passwordHash = await bcrypt.hash(password, 12);

  // Create new user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      role,
    },
  });

  const token = tokenFor(user);

  return res.status(201).json({
    message: "Account created successfully",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

// LOGIN
export const login = asyncHandler(async (req, res) => {
  const email = req.body.email?.trim().toLowerCase();
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  // Find user from database
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(
    password,
    user.passwordHash
  );

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  // Generate token
  const token = tokenFor(user);

  return res.status(200).json({
    message: "Login successful",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

// GET CURRENT LOGGED-IN USER
export const me = asyncHandler(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  return res.status(200).json({
    user,
  });
});
