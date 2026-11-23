
import React, { useEffect, useState } from "react";
import {
  getMeetings,
  updateMeeting,
} from "../../services/meetingService";

export default function Meetings() {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadMeetings = async () => {
    try {
      setError("");
      const data = await getMeetings();
      setMeetings(data);
    } catch (err) {
      setError(err.message || "Unable to load meeting requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMeetings();
  }, []);

  const changeStatus = async (id, status) => {
    try {
      setUpdating(id);
      setError("");
      setMessage("");

      await updateMeeting(id, status);

      if (status === "CONFIRMED") {
        setMessage("Meeting confirmed successfully!");
      } else if (status === "CANCELLED") {
        setMessage("Meeting request cancelled/rejected.");
      } else {
        setMessage("Meeting marked as completed!");
      }

      await loadMeetings();
    } catch (err) {
      setError(err.message || "Unable to update meeting.");
    } finally {
      setUpdating("");
    }
  };

  const formatDate = (value) =>
    new Date(value).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const statusLabel = {
    REQUESTED: "Pending Request",
    CONFIRMED: "Confirmed",
    COMPLETED: "Completed",
    CANCELLED: "Rejected / Cancelled",
  };

  return (
    <main className="hh-page mentor-meetings-page">
      <header className="hh-head">
        <div>
          <p className="hh-eyebrow">MENTOR WORKSPACE</p>
          <h1>Meeting Requests</h1>
          <p>Manage your student mentoring sessions.</p>
        </div>
      </header>

      {error && <p className="student-error">{error}</p>}
      {message && <p className="student-success">{message}</p>}

      <section className="hh-card">
        <h2>All Meetings</h2>

        {loading ? (
          <p className="hh-muted">Loading meetings...</p>
        ) : meetings.length === 0 ? (
          <p className="hh-muted">No meeting requests yet.</p>
        ) : (
          meetings.map((meeting) => (
            <article className="hh-meeting" key={meeting.id}>
              <div>
                <strong>{meeting.topic}</strong>

                <p>
                  Student: {meeting.student?.name || "Unknown"}
                </p>

                <p>
                  Email: {meeting.student?.email || "Not available"}
                </p>

                <p>
                  {formatDate(meeting.date)} at {meeting.time}
                </p>

                <span className="hh-status">
                  {statusLabel[meeting.status] || meeting.status}
                </span>
              </div>

              <div className="hh-meeting-actions">
                {meeting.status === "REQUESTED" && (
                  <>
                    <button
                      className="hh-btn"
                      disabled={updating === meeting.id}
                      onClick={() =>
                        changeStatus(meeting.id, "CONFIRMED")
                      }
                    >
                      Confirm
                    </button>

                    <button
                      className="hh-btn hh-btn-light"
                      disabled={updating === meeting.id}
                      onClick={() =>
                        changeStatus(meeting.id, "CANCELLED")
                      }
                    >
                      Reject
                    </button>
                  </>
                )}

                {meeting.status === "CONFIRMED" && (
                  <>
                    <button
                      className="hh-btn"
                      disabled={updating === meeting.id}
                      onClick={() =>
                        changeStatus(meeting.id, "COMPLETED")
                      }
                    >
                      Mark Completed
                    </button>

                    <button
                      className="hh-btn hh-btn-light"
                      disabled={updating === meeting.id}
                      onClick={() =>
                        changeStatus(meeting.id, "CANCELLED")
                      }
                    >
                      Cancel
                    </button>
                  </>
                )}

                {updating === meeting.id && (
                  <small>Updating...</small>
                )}
              </div>
            </article>
          ))
        )}
      </section>
    </main>
  );
}
