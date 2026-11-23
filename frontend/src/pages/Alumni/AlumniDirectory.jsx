import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest } from "../../services/api";

export default function AlumniDirectory() {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadAlumni = async () => {
      try {
        const data = await apiRequest("/alumni");
        setAlumni(data.alumni || []);
      } catch (err) {
        setError(err.message || "Unable to load Alumni directory.");
      } finally {
        setLoading(false);
      }
    };

    loadAlumni();
  }, []);

  return (
    <main className="hh-page">
      <header className="hh-head">
        <div>
          <p className="hh-eyebrow">STUDENT SPACE</p>
          <h1>Alumni Directory</h1>
          <p>
            Connect with experienced professionals and learn from
            their career journeys.
          </p>
        </div>

        <Link className="hh-btn" to="/student/mentor">
          My Mentor
        </Link>
      </header>

      {loading ? (
        <section className="hh-card">
          <h2>Loading Alumni...</h2>
          <p className="hh-muted">
            Fetching registered Alumni profiles.
          </p>
        </section>
      ) : error ? (
        <section className="hh-card">
          <h2>Unable to load Alumni</h2>
          <p className="hh-muted">{error}</p>
        </section>
      ) : alumni.length === 0 ? (
        <section className="hh-card">
          <h2>No Alumni registered yet</h2>
          <p className="hh-muted">
            Registered Alumni will appear here.
          </p>
        </section>
      ) : (
        <section className="hh-grid">
          {alumni.map((person) => {
            const profile = person.alumniProfile;

            return (
              <article className="hh-card" key={person.id}>
                <div className="hh-avatar">
                  {person.name?.charAt(0)?.toUpperCase() || "A"}
                </div>

                <h2>{person.name}</h2>

                {profile ? (
                  <>
                    <h3>{profile.jobTitle || "Professional"}</h3>

                    <p className="hh-muted">
                      {profile.company || "Company not added"}
                    </p>

                    {profile.experience && (
                      <p>
                        Experience: {profile.experience}
                      </p>
                    )}

                    {profile.location && (
                      <p>Location: {profile.location}</p>
                    )}

                    {profile.expertise?.length > 0 && (
                      <div style={{ marginTop: "14px" }}>
                        <strong>Areas of expertise</strong>

                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "8px",
                            marginTop: "10px",
                          }}
                        >
                          {profile.expertise.map((item) => (
                            <span className="hh-mini" key={item}>
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {profile.bio && (
                      <p style={{ marginTop: "14px" }}>
                        {profile.bio}
                      </p>
                    )}

                    {profile.linkedinUrl && (
                      <a
                        href={profile.linkedinUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          display: "inline-block",
                          marginTop: "14px",
                        }}
                      >
                        View LinkedIn Profile ↗
                      </a>
                    )}
                  </>
                ) : (
                  <p className="hh-muted">
                    This Alumni has not completed their profile yet.
                  </p>
                )}

              </article>
            );
          })}
        </section>
      )}
    </main>
  );
}