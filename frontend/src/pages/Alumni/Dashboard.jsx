import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  HeartHandshake,
  LayoutDashboard,
  BriefcaseBusiness,
  MapPin,
  ExternalLink,
  GraduationCap,
  CheckCircle2,
} from "lucide-react";

import { getAlumniProfile } from "../../services/alumniService";

function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getAlumniProfile();
        setProfile(data.profile);
      } catch (err) {
        setError(err.message || "Unable to load your profile.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  return (
    <div className="student-dashboard">
      {/* SIDEBAR */}
      <aside className="student-sidebar">
        <div className="student-sidebar-brand">
          <div className="student-sidebar-logo">
            <HeartHandshake size={21} />
          </div>

          <div>
            <h2>HandHold</h2>
            <span>Alumni Space</span>
          </div>
        </div>

        <nav className="student-nav">
          <Link className="student-nav-item" to="/alumni/dashboard">
            <LayoutDashboard size={19} />
            Dashboard
          </Link></nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="student-main">
        <header className="profile-topbar">
          <div>
            <h2>Alumni Dashboard</h2>
            <p>Share your experience and inspire students.</p>
          </div>

          <GraduationCap size={22} />
        </header>

        <div className="profile-page-content">
          <div className="profile-heading-row">
            <div>
              <h1>Welcome to your Alumni Space!</h1>
              <p>
                Your professional journey can help students build
                their future.
              </p>
            </div>
          </div>

          <section className="profile-panel">
            {loading ? (
              <div className="profile-empty">
                <p>Loading your profile...</p>
              </div>
            ) : error ? (
              <div className="profile-empty">
                <p style={{ color: "#dc2626" }}>{error}</p>
                <p>
                  Please check your backend connection and try again.
                </p>
              </div>
            ) : !profile ? (
              <div className="profile-empty">
                <BriefcaseBusiness size={32} />

                <h3>Complete your Alumni profile</h3>

                <p>
                  Add your professional details so students can
                  learn about your experience.
                </p>

                <Link to="/alumni/onboarding">
                  Complete Profile
                </Link>
              </div>
            ) : (
              <div>
                <div className="profile-card-heading">
                  <div className="onboarding-card-icon">
                    <BriefcaseBusiness size={22} />
                  </div>

                  <div>
                    <h2>{profile.user?.name || "Alumni"}</h2>
                    <p>{profile.user?.email}</p>
                  </div>

                  <CheckCircle2
                    size={22}
                    color="#16a34a"
                    style={{ marginLeft: "auto" }}
                  />
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "18px",
                    marginTop: "28px",
                  }}
                >
                  <div>
                    <p className="onboarding-label">COMPANY</p>
                    <h3>{profile.company || "Not added"}</h3>
                  </div>

                  <div>
                    <p className="onboarding-label">JOB TITLE</p>
                    <h3>{profile.jobTitle || "Not added"}</h3>
                  </div>

                  <div>
                    <p className="onboarding-label">EXPERIENCE</p>
                    <h3>{profile.experience || "Not added"}</h3>
                  </div>

                  <div>
                    <p className="onboarding-label">
                      <MapPin
                        size={13}
                        style={{ display: "inline" }}
                      />{" "}
                      LOCATION
                    </p>
                    <h3>{profile.location || "Not added"}</h3>
                  </div>
                </div>

                <div style={{ marginTop: "28px" }}>
                  <p className="onboarding-label">
                    AREAS OF EXPERTISE
                  </p>

                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "10px",
                      marginTop: "12px",
                    }}
                  >
                    {profile.expertise?.length > 0 ? (
                      profile.expertise.map((item) => (
                        <span
                          key={item}
                          className="selection-option selected"
                          style={{ cursor: "default" }}
                        >
                          {item}
                        </span>
                      ))
                    ) : (
                      <p>No expertise added yet.</p>
                    )}
                  </div>
                </div>

                {profile.bio && (
                  <div style={{ marginTop: "28px" }}>
                    <p className="onboarding-label">ABOUT YOU</p>
                    <p style={{ lineHeight: 1.7 }}>
                      {profile.bio}
                    </p>
                  </div>
                )}

                {profile.linkedinUrl && (
                  <div style={{ marginTop: "24px" }}>
                    <a
                      href={profile.linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <ExternalLink size={18} />
                      View LinkedIn Profile
                    </a>
                  </div>
                )}
              </div>
            )}
          </section>

          <section
            className="profile-panel"
            style={{ marginTop: "22px" }}
          >
            <div className="profile-empty">
              <GraduationCap size={32} />

              <h3>Make a difference with HandHold</h3>

              <p>
                Connect with students, share career guidance,
                and help them make informed decisions about their future.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;