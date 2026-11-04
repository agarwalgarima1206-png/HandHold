
import React, { useEffect, useState } from "react";
import {
  getMeetings,
  createMeeting,
  updateMeeting,
} from "../../services/meetingService";

export default function Meetings() {
  const [items, setItems] = useState([]);
  const [topic, setTopic] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const today = new Date();
  const minDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const loadMeetings = async () => {
    try {
      setError("");
      const data = await getMeetings();
      setItems(data);
    } catch (err) {
      setError(err.message || "Unable to load meetings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMeetings();
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    if (!topic.trim() || !date || !time) return;

    try {
      setSaving(true);
      setError("");
      setMessage("");

      await createMeeting({
        topic: topic.trim(),
        date,
        time,
      });

      setTopic("");
      setDate("");
      setTime("");
      setMessage("Meeting request sent successfully!");

      await loadMeetings();
    } catch (err) {
      setError(err.message || "Unable to send meeting request.");
    } finally {
      setSaving(false);
    }
  };

  const cancel = async (id) => {
    try {
      setError("");
      setMessage("");

      await updateMeeting(id, "CANCELLED");

      setMessage("Meeting cancelled successfully!");
      await loadMeetings();
    } catch (err) {
      setError(err.message || "Unable to cancel meeting.");
    }
  };

  const formatDate = (value) => {
    return new Date(value).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatStatus = (status) => {
    const labels = {
      REQUESTED: "Requested",
      CONFIRMED: "Confirmed",
      COMPLETED: "Completed",
      CANCELLED: "Cancelled",
    };

    return labels[status] || status;
  };

  return (
  <main className="hh-page student-meetings-page">
      <header className="hh-head">
        <div>
          <p className="hh-eyebrow">CONNECT</p>
          <h1>Meetings</h1>
          <p>
            Request a mentoring session and keep track of your requests.
          </p>
        </div>
      </header>

      {error && (
        <p className="student-error">{error}</p>
      )}

      {message && (
        <p className="student-success">{message}</p>
      )}

      <section className="hh-card">
        <h2>Request a meeting</h2>

        <form
          className="hh-form hh-form-stack"
          onSubmit={submit}
        >
          <label>
            What would you like to discuss?

            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Career guidance, project feedback..."
              required
            />
          </label>

          <div className="hh-form-row">
            <label>
              Date

              <input
                type="date"
                min={minDate}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </label>

            <label>
              Time

              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </label>
          </div>

          <button
            className="hh-btn"
            type="submit"
            disabled={saving}
          >
            {saving ? "Sending..." : "Send meeting request"}
          </button>
        </form>

        <p className="hh-muted">
          Your request will be sent to your assigned mentor.
        </p>
      </section>

      <section className="hh-card">
        <h2>Your requests</h2>

        {loading ? (
          <p className="hh-muted">Loading meetings...</p>
        ) : items.length === 0 ? (
          <p className="hh-muted">No meeting requests yet.</p>
        ) : (
          items.map((meeting) => (
            <article className="hh-meeting" key={meeting.id}>
              <div>
                <strong>{meeting.topic}</strong>

                <p>
                  {formatDate(meeting.date)} at {meeting.time}
                </p>

                <p>
                  Mentor: {meeting.mentor?.name || "Not assigned"}
                </p>

                <span className="hh-status">
                  {formatStatus(meeting.status)}
                </span>
              </div>

              {(meeting.status === "REQUESTED" ||
                meeting.status === "CONFIRMED") && (
                <button
                  type="button"
                  className="hh-btn hh-btn-light"
                  onClick={() => cancel(meeting.id)}
                >
                  Cancel
                </button>
              )}
            </article>
          ))
        )}
      </section>
    </main>
  );
}
