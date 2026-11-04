
import { prisma } from "../config/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Create meeting request by student
export const createMeeting = asyncHandler(async (req, res) => {
  if (req.user.role !== "STUDENT") {
    return res.status(403).json({
      message: "Only students can request meetings",
    });
  }

  const { topic, date, time, mentorId } = req.body;

  if (!topic?.trim() || !date || !time?.trim()) {
    return res.status(400).json({
      message: "Topic, date and time are required",
    });
  }

  const meetingDate = new Date(date);

  if (Number.isNaN(meetingDate.getTime())) {
    return res.status(400).json({
      message: "Invalid meeting date",
    });
  }

  if (meetingDate < new Date()) {
    return res.status(400).json({
      message: "Meeting date cannot be in the past",
    });
  }

  const studentProfile = await prisma.studentProfile.findUnique({
    where: { userId: req.user.id },
    select: { mentorId: true },
  });

  if (!studentProfile?.mentorId) {
    return res.status(400).json({
      message: "Please get a mentor assigned before requesting a meeting",
    });
  }

  if (mentorId && mentorId !== studentProfile.mentorId) {
    return res.status(403).json({
      message: "You can only request a meeting with your assigned mentor",
    });
  }

  const meeting = await prisma.meeting.create({
    data: {
      studentId: req.user.id,
      mentorId: studentProfile.mentorId,
      topic: topic.trim(),
      date: meetingDate,
      time: time.trim(),
      status: "REQUESTED",
    },
    include: {
      student: {
        select: { id: true, name: true, email: true },
      },
      mentor: {
        select: { id: true, name: true, email: true },
      },
    },
  });

  // Notify mentor about new meeting request
  try {
    await prisma.notification.create({
      data: {
        userId: meeting.mentorId,
        title: "New Meeting Request",
        message: `${meeting.student.name} has requested a meeting about "${meeting.topic}".`,
        type: "MEETING",
      },
    });
  } catch (error) {
    console.error("Meeting notification error:", error);
  }

  res.status(201).json({
    message: "Meeting request submitted successfully",
    meeting,
  });
});

// Get meetings for logged-in student or mentor
export const listMeetings = asyncHandler(async (req, res) => {
  let where;

  if (req.user.role === "MENTOR") {
    where = { mentorId: req.user.id };
  } else if (req.user.role === "STUDENT") {
    where = { studentId: req.user.id };
  } else {
    return res.status(403).json({
      message: "Not allowed",
    });
  }

  const meetings = await prisma.meeting.findMany({
    where,
    include: {
      student: {
        select: { id: true, name: true, email: true },
      },
      mentor: {
        select: { id: true, name: true, email: true },
      },
    },
    orderBy: [
      { date: "asc" },
      { time: "asc" },
    ],
  });

  res.json({ meetings });
});

// Update meeting status
export const updateMeeting = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const allowedStatuses = [
    "CONFIRMED",
    "COMPLETED",
    "CANCELLED",
  ];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
      message: "Invalid meeting status",
    });
  }

  const meeting = await prisma.meeting.findUnique({
    where: { id: req.params.id },
  });

  if (!meeting) {
    return res.status(404).json({
      message: "Meeting not found",
    });
  }

  const isMentor =
    req.user.role === "MENTOR" &&
    meeting.mentorId === req.user.id;

  const isStudent =
    req.user.role === "STUDENT" &&
    meeting.studentId === req.user.id;

  if (!isMentor && !isStudent) {
    return res.status(403).json({
      message: "You are not allowed to update this meeting",
    });
  }

  if (
    meeting.status !== "REQUESTED" &&
    meeting.status !== "CONFIRMED"
  ) {
    return res.status(400).json({
      message: "This meeting can no longer be updated",
    });
  }

  // Mentor can confirm, cancel or complete a meeting
  if (isMentor) {
    if (
      status === "COMPLETED" &&
      meeting.status !== "CONFIRMED"
    ) {
      return res.status(400).json({
        message: "Only confirmed meetings can be completed",
      });
    }
  }

  // Student can only cancel their own meeting
  if (isStudent && status !== "CANCELLED") {
    return res.status(403).json({
      message: "Students can only cancel meeting requests",
    });
  }

  const updatedMeeting = await prisma.meeting.update({
    where: { id: meeting.id },
    data: { status },
    include: {
      student: {
        select: { id: true, name: true, email: true },
      },
      mentor: {
        select: { id: true, name: true, email: true },
      },
    },
  });

  // Send notification only when status actually changes
  if (meeting.status !== status) {
    let recipientId;
    let title;
    let message;

    if (isMentor) {
      recipientId = updatedMeeting.studentId;

      if (status === "CONFIRMED") {
        title = "Meeting Confirmed";
        message = `Your meeting about "${updatedMeeting.topic}" has been confirmed by your mentor.`;
      } else if (status === "CANCELLED") {
        title = "Meeting Cancelled";
        message = `Your meeting about "${updatedMeeting.topic}" has been cancelled by your mentor.`;
      } else {
        title = "Meeting Completed";
        message = `Your meeting about "${updatedMeeting.topic}" has been marked as completed.`;
      }
    } else {
      recipientId = updatedMeeting.mentorId;
      title = "Meeting Cancelled";
      message = `${updatedMeeting.student.name} has cancelled the meeting about "${updatedMeeting.topic}".`;
    }

    try {
      await prisma.notification.create({
        data: {
          userId: recipientId,
          title,
          message,
          type: "MEETING",
        },
      });
    } catch (error) {
      console.error("Meeting notification error:", error);
    }
  }

  res.json({
    message: "Meeting updated successfully",
    meeting: updatedMeeting,
  });
});
