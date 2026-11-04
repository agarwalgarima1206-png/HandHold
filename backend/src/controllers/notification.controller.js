import { prisma } from "../config/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Get notifications of logged-in user
export const getNotifications = asyncHandler(async (req, res) => {
  const notifications = await prisma.notification.findMany({
    where: { userId: req.user.id },
    orderBy: { createdAt: "desc" },
  });

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  res.json({
    notifications,
    unreadCount,
  });
});

// Mark one notification as read
export const markNotificationRead = asyncHandler(async (req, res) => {
  const notification = await prisma.notification.findFirst({
    where: {
      id: req.params.id,
      userId: req.user.id,
    },
  });

  if (!notification) {
    return res.status(404).json({
      message: "Notification not found",
    });
  }

  const updatedNotification = await prisma.notification.update({
    where: { id: notification.id },
    data: { isRead: true },
  });

  res.json({
    message: "Notification marked as read",
    notification: updatedNotification,
  });
});

// Mark all notifications as read
export const markAllNotificationsRead = asyncHandler(async (req, res) => {
  await prisma.notification.updateMany({
    where: {
      userId: req.user.id,
      isRead: false,
    },
    data: { isRead: true },
  });

  res.json({
    message: "All notifications marked as read",
  });
});

// Delete one notification
export const deleteNotification = asyncHandler(async (req, res) => {
  const notification = await prisma.notification.findFirst({
    where: {
      id: req.params.id,
      userId: req.user.id,
    },
  });

  if (!notification) {
    return res.status(404).json({
      message: "Notification not found",
    });
  }

  await prisma.notification.delete({
    where: { id: notification.id },
  });

  res.json({
    message: "Notification deleted successfully",
  });
});