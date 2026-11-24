import { useState } from "react";
import { submitFeedback } from "../../services/feedbackService";

export default function Feedback() {
  const [rating, setRating] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      await submitFeedback({ rating, comment: note.trim() });
      setMessage("Thank you! Your feedback has been submitted.");
      setRating("");
      setNote("");
    } catch (err) {
      setError(err.message || "Unable to submit feedback. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="hh-page">
      <header className="hh-head">
        <div>
          <p className="hh-eyebrow">HELP US IMPROVE</p>
          <h1>Feedback</h1>
          <p>Share feedback about your mentoring experience.</p>
        </div>
      </header>

      <section className="hh-card">
        <form className="hh-form hh-form-stack" onSubmit={submit}>
          <label>
            How was your experience?
            <select value={rating} onChange={(event) => setRating(event.target.value)} required>
              <option value="">Choose a rating</option>
              <option value="Very helpful">Very helpful</option>
              <option value="Helpful">Helpful</option>
              <option value="Okay">Okay</option>
              <option value="Needs improvement">Needs improvement</option>
            </select>
          </label>

          <label>
            Anything you would like us to know?
            <textarea
              rows="5"
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Write your feedback…"
            />
          </label>

          <button className="hh-btn" disabled={loading}>
            {loading ? "Submitting…" : "Submit feedback"}
          </button>
          {message && <p className="hh-success" role="status">{message}</p>}
          {error && <p className="hh-error" role="alert">{error}</p>}
        </form>
      </section>
    </main>
  );
}
