
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest } from "../../services/api";

export default function MyMentor() {
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadMentor = async () => {
      try {
        const data = await apiRequest("/students/profile");
        setMentor(data.profile?.mentor || null);
      } catch (err) {
        setError(err.message || "Unable to load mentor details.");
      } finally {
        setLoading(false);
      }
    };

    loadMentor();
  }, []);

  return (
    <main className="hh-page">
      <header className="hh-head">
        <div>
          <p className="hh-eyebrow">STUDENT SPACE</p>
          <h1>My Mentor</h1>
          <p>View your mentor details and keep your guidance journey organized.</p>
        </div>

        <Link className="hh-btn" to="/student/meetings">
          Request a meeting
        </Link>
      </header>

      <section className="hh-card hh-mentor-card">
        {loading ? (
          <div>
            <h2>Loading mentor details...</h2>
          </div>
        ) : error ? (
          <div>
            <h2>Unable to load mentor</h2>
            <p className="hh-muted">{error}</p>
          </div>
        ) : mentor ? (
          <>
            <div className="hh-avatar">
              {mentor.name?.charAt(0)?.toUpperCase() || "M"}
            </div>

            <div>
              <h2>{mentor.name}</h2>
              <p>Assigned Mentor</p>
              <span>Career guidance • Skill development • Academic support</span>
              <p className="hh-muted">{mentor.email}</p>
            </div>
          </>
        ) : (
          <>
            <div className="hh-avatar">?</div>
            <div>
              <h2>Your mentor will appear here</h2>
              <p>Mentor matching</p>
              <span>
                Career guidance • Skill development • Academic support
              </span>
              <p className="hh-muted">
                Your mentor has not been assigned yet.
              </p>
            </div>
          </>
        )}
      </section>

      <section className="hh-card">
        <h2>What you can discuss</h2>

        <div className="hh-grid">
          {[
            "Career planning",
            "Technical skills",
            "Internship preparation",
            "Study and project guidance",
          ].map((item) => (
            <article className="hh-mini" key={item}>
              <h3>{item}</h3>
              <p>
                Bring your questions and goals to your mentoring sessions.
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
