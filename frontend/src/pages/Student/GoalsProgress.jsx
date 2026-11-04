
import React, { useEffect, useState } from "react";
import {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
} from "../../services/goalService";

export default function GoalsProgress() {
  const [goals, setGoals] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = async () => {
    try {
      setError("");
      const data = await getGoals();
      setGoals(data);
    } catch (err) {
      setError(err.message || "Unable to load goals.");
    } finally {
      setLoading(false);
    }
  };

  const addGoal = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      setSaving(true);
      setError("");

      const data = await createGoal({
        title: title.trim(),
        description: description.trim(),
      });

      setGoals((old) => [data.goal, ...old]);
      setTitle("");
      setDescription("");
    } catch (err) {
      setError(err.message || "Unable to add goal.");
    } finally {
      setSaving(false);
    }
  };

  const toggleGoal = async (goal) => {
    try {
      setError("");

      const data = await updateGoal(goal.id, {
        completed: !goal.completed,
      });

      setGoals((old) =>
        old.map((g) => (g.id === goal.id ? data.goal : g))
      );
    } catch (err) {
      setError(err.message || "Unable to update goal.");
    }
  };

  const removeGoal = async (id) => {
    if (!window.confirm("Are you sure you want to delete this goal?")) {
      return;
    }

    try {
      setError("");
      await deleteGoal(id);
      setGoals((old) => old.filter((g) => g.id !== id));
    } catch (err) {
      setError(err.message || "Unable to delete goal.");
    }
  };

  const complete = goals.filter((g) => g.completed).length;
  const progress = goals.length
    ? Math.round((complete / goals.length) * 100)
    : 0;

  return (
    <main className="hh-page">
      <header className="hh-head">
        <div>
          <p className="hh-eyebrow">YOUR JOURNEY</p>
          <h1>Goals & Progress</h1>
          <p>
            Break your bigger plans into small steps and track your progress.
          </p>
        </div>

        <div className="hh-progress-number">
          {progress}%
          <small>completed</small>
        </div>
      </header>

      {error && <p className="student-error">{error}</p>}

      <section className="hh-card">
        <div className="hh-progress-track">
          <div style={{ width: `${progress}%` }} />
        </div>
        <p className="hh-muted">
          {complete} of {goals.length} goals completed
        </p>
      </section>

      <section className="hh-card">
        <h2>Add a goal</h2>

        <form className="hh-form" onSubmit={addGoal}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Complete my portfolio project"
            aria-label="New goal"
            required
          />

          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a short description"
            aria-label="Goal description"
          />

          <button className="hh-btn" type="submit" disabled={saving}>
            {saving ? "Saving..." : "Add goal"}
          </button>
        </form>
      </section>

      <section className="hh-card">
        <h2>Your goals</h2>

        {loading ? (
          <p>Loading your goals...</p>
        ) : goals.length === 0 ? (
          <p>No goals yet. Add your first goal above.</p>
        ) : (
          goals.map((goal) => (
            <div
              className={`hh-goal ${goal.completed ? "is-done" : ""}`}
              key={goal.id}
            >
              <input
                type="checkbox"
                checked={goal.completed}
                onChange={() => toggleGoal(goal)}
                aria-label={`Mark ${goal.title} as ${
                  goal.completed ? "incomplete" : "complete"
                }`}
              />

              <span>
                <strong>{goal.title}</strong>
                <small>{goal.description || "Personal goal"}</small>
              </span>

              <em>
                {goal.completed ? "Completed" : "In progress"}
              </em>

              <button
                type="button"
                onClick={() => removeGoal(goal.id)}
                aria-label={`Delete ${goal.title}`}
                title="Delete goal"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </section>
    </main>
  );
}
