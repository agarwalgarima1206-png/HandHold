
import { useCallback, useEffect, useState } from "react";
import {
  Bell,
  X,
  CheckCheck,
  Trash2,
  CalendarDays,
  Target,
  RefreshCw,
} from "lucide-react";
import { apiRequest } from "../../services/api";

export default function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadNotifications = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await apiRequest("/notifications");

      setNotifications(data.notifications || []);
      setUnreadCount(data.unreadCount || 0);
    } catch (err) {
      setError(err.message || "Unable to load notifications");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  const toggleDropdown = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);

    if (nextState) {
      loadNotifications();
    }
  };

  const markAsRead = async (id) => {
    try {
      await apiRequest(`/notifications/${id}/read`, {
        method: "PATCH",
      });

      await loadNotifications();
    } catch (err) {
      setError(err.message || "Unable to update notification");
    }
  };

  const markAllAsRead = async () => {
    try {
      await apiRequest("/notifications/read-all", {
        method: "PATCH",
      });

      await loadNotifications();
    } catch (err) {
      setError(err.message || "Unable to update notifications");
    }
  };

  const deleteNotification = async (id) => {
    try {
      await apiRequest(`/notifications/${id}`, {
        method: "DELETE",
      });

      await loadNotifications();
    } catch (err) {
      setError(err.message || "Unable to delete notification");
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const getNotificationIcon = (type) => {
    if (type === "MEETING") {
      return <CalendarDays size={19} />;
    }

    if (type === "GOAL") {
      return <Target size={19} />;
    }

    return <Bell size={19} />;
  };

  return (
    <div className="notification-wrapper">
      <button
        className="notification-button"
        onClick={toggleDropdown}
        aria-label={`Notifications, ${unreadCount} unread`}
        aria-expanded={isOpen}
      >
        <Bell size={20} />

        {unreadCount > 0 && (
          <span className="notification-count">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="notification-backdrop"
            onClick={() => setIsOpen(false)}
          />

          <div className="notification-dropdown">
            <div className="notification-header">
              <div>
                <h3>Notifications</h3>
                <span>
                  {unreadCount} unread notification
                  {unreadCount !== 1 ? "s" : ""}
                </span>
              </div>

              <div className="notification-header-actions">
                {unreadCount > 0 && (
                  <button
                    className="notification-action"
                    onClick={markAllAsRead}
                    title="Mark all as read"
                  >
                    <CheckCheck size={17} />
                  </button>
                )}

                <button
                  onClick={() => setIsOpen(false)}
                  className="notification-close"
                  aria-label="Close notifications"
                >
                  <X size={17} />
                </button>
              </div>
            </div>

            {error && (
              <p className="notification-error">{error}</p>
            )}

            {loading ? (
              <div className="notification-message">
                <RefreshCw size={22} />
                <p>Loading notifications...</p>
              </div>
            ) : notifications.length === 0 ? (
              <div className="notification-empty">
                <div className="notification-empty-icon">
                  <Bell size={22} />
                </div>

                <h4>No notifications yet</h4>

                <p>
                  Meeting updates and goal activities will
                  appear here.
                </p>
              </div>
            ) : (
              <div className="notification-list">
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    className={`notification-item ${
                      !item.isRead ? "unread" : ""
                    }`}
                  >
                    <div className="notification-item-icon">
                      {getNotificationIcon(item.type)}
                    </div>

                    <div className="notification-item-content">
                      <strong>{item.title}</strong>

                      <p>{item.message}</p>

                      <span>
                        {formatDate(item.createdAt)}
                      </span>

                      {!item.isRead && (
                        <button
                          className="notification-read-button"
                          onClick={() => markAsRead(item.id)}
                        >
                          Mark as read
                        </button>
                      )}
                    </div>

                    <button
                      className="notification-delete"
                      onClick={() => deleteNotification(item.id)}
                      title="Delete notification"
                      aria-label="Delete notification"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

