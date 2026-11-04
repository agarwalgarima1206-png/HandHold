
import { Link } from "react-router-dom";
import {
  HeartHandshake,
  LayoutDashboard,
  Users,
  CheckCircle2,
} from "lucide-react";

import NotificationBell from "../../components/Notifications/NotificationBell";

export default function MentorPortalPage({ title, subtitle }) {
  return (
    <div className="student-dashboard">
      <aside className="student-sidebar">

        <div className="student-sidebar-brand">
          <div className="student-sidebar-logo">
            <HeartHandshake size={21} />
          </div>

          <div>
            <h2>HandHold</h2>
            <span>Mentor Space</span>
          </div>
        </div>

        <nav className="student-nav">
          <Link className="student-nav-item" to="/mentor/dashboard">
            <LayoutDashboard size={19} />
            Dashboard
          </Link>

          <Link className="student-nav-item" to="/mentor/students">
            <Users size={19} />
            My Students
          </Link>
        </nav>

      </aside>

      <main className="student-main">

        <header className="profile-topbar">
          <div>
            <h2>{title}</h2>
            <p>{subtitle}</p>
          </div>

          <NotificationBell />
        </header>

        <div className="profile-page-content">

          <div className="profile-heading-row">
            <div>
              <h1>{title}</h1>
              <p>{subtitle}</p>
            </div>
          </div>

          <section className="profile-panel">
            <div className="profile-empty">
              <CheckCircle2 size={32} />

              <h3>Mentor workspace is ready</h3>

              <p>
                Connect the backend to load assigned students,
                appointments, and mentoring requests.
              </p>

              <Link to="/mentor/students">
                View student directory
              </Link>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
