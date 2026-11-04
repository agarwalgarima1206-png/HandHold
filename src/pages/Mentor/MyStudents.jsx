
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  HeartHandshake,
  LayoutDashboard,
  Users,
  Bell,
  Mail,
  GraduationCap,
  BookOpen,
  UserPlus,
  CheckCircle2,
  Target,
} from "lucide-react";

import {
  getStudentDirectory,
  getMyStudents,
  assignStudent,
  getStudentGoals,
} from "../../services/mentorService";

export default function MyStudents() {
  const [students, setStudents] = useState([]);
  const [directory, setDirectory] = useState([]);
  const [goalsByStudent, setGoalsByStudent] = useState({});
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadStudents = async () => {
    try {
      setError("");

      const [assignedStudents, allStudents] = await Promise.all([
        getMyStudents(),
        getStudentDirectory(),
      ]);

      setStudents(assignedStudents);
      setDirectory(allStudents);

      const goalResults = await Promise.all(
        assignedStudents.map(async (student) => {
          try {
            const goals = await getStudentGoals(student.id);
            return [student.id, goals];
          } catch {
            return [student.id, []];
          }
        })
      );

      setGoalsByStudent(Object.fromEntries(goalResults));
    } catch (err) {
      setError(err.message || "Unable to load students.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleAssign = async (studentId) => {
    try {
      setAssigning(studentId);
      setError("");
      setMessage("");

      await assignStudent(studentId);

      setMessage("Student assigned successfully!");
      await loadStudents();
    } catch (err) {
      setError(err.message || "Unable to assign student.");
    } finally {
      setAssigning("");
    }
  };

  const assignedIds = new Set(students.map((student) => student.id));

  const renderStudentCard = (student, isAssigned) => {
    const goals = goalsByStudent[student.id] || [];
    const completed = goals.filter((goal) => goal.completed).length;
    const progress = goals.length
      ? Math.round((completed / goals.length) * 100)
      : 0;

    return (
      <article className="mentor-student-card" key={student.id}>
        <div className="mentor-student-top">
          <div className="mentor-student-avatar">
            {student.user?.name?.charAt(0)?.toUpperCase() || "S"}
          </div>

          <span className="student-status">
            {isAssigned ? "Assigned" : "Available"}
          </span>
        </div>

        <h3>{student.user?.name || "Student"}</h3>

        <p className="mentor-student-email">
          <Mail size={15} />
          {student.user?.email || "No email"}
        </p>

        <div className="mentor-student-info">
          <p>
            <GraduationCap size={16} />
            {student.college || "College not provided"}
          </p>

          <p>
            <BookOpen size={16} />
            {student.course || "Course not provided"}
          </p>

          <p>Semester: {student.semester || "Not provided"}</p>
        </div>

        {isAssigned && (
          <div className="mentor-goals-section">
            <h4>
              <Target size={17} />
              Goals & Progress
            </h4>

            <div className="mentor-goals-summary">
              <strong>{progress}%</strong>
              <span>
                {completed} of {goals.length} completed
              </span>
            </div>

            <div className="hh-progress-track">
              <div style={{ width: `${progress}%` }} />
            </div>

            {goals.length === 0 ? (
              <p className="hh-muted">No goals added yet.</p>
            ) : (
              <div className="mentor-goals-list">
                {goals.map((goal) => (
                  <div className="mentor-goal-item" key={goal.id}>
                    <span>{goal.title}</span>
                    <small>
                      {goal.completed ? "Completed" : "In progress"}
                    </small>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {isAssigned ? (
          <button className="student-assigned-button" disabled>
            <CheckCircle2 size={16} /> Assigned to you
          </button>
        ) : (
          <button
            className="student-assign-button"
            onClick={() => handleAssign(student.id)}
            disabled={assigning === student.id}
          >
            <UserPlus size={16} />
            {assigning === student.id ? "Assigning..." : "Assign Student"}
          </button>
        )}
      </article>
    );
  };

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

          <Link className="student-nav-item active" to="/mentor/students">
            <Users size={19} />
            My Students
          </Link>
        </nav>
      </aside>

      <main className="student-main">
        <header className="profile-topbar">
          <div>
            <h2>My Students</h2>
            <p>View and support students assigned to you.</p>
          </div>
          <Bell size={19} />
        </header>

        <div className="profile-page-content">
          <div className="profile-heading-row">
            <div>
              <span className="dashboard-eyebrow">MENTOR WORKSPACE</span>
              <h1>My Students</h1>
              <p>Connect with students and support their growth.</p>
            </div>
          </div>

          {message && <p className="student-success">{message}</p>}
          {error && <p className="student-error">{error}</p>}

          {loading ? (
            <p>Loading students...</p>
          ) : (
            <>
              <section className="profile-panel">
                <div className="profile-section-heading">
                  <div>
                    <h2>Assigned Students</h2>
                    <p>Your current student connections</p>
                  </div>
                  <span className="student-count">
                    {students.length} Students
                  </span>
                </div>

                {students.length === 0 ? (
                  <div className="profile-empty">
                    <Users size={36} />
                    <h3>No assigned students yet</h3>
                    <p>Choose a student from the directory below.</p>
                  </div>
                ) : (
                  <div className="mentor-student-grid">
                    {students.map((student) =>
                      renderStudentCard(student, true)
                    )}
                  </div>
                )}
              </section>

              <section className="profile-panel" style={{ marginTop: 24 }}>
                <div className="profile-section-heading">
                  <div>
                    <h2>Student Directory</h2>
                    <p>Find students available for mentoring</p>
                  </div>
                  <span className="student-count">
                    {directory.length} Students
                  </span>
                </div>

                {directory.length === 0 ? (
                  <div className="profile-empty">
                    <Users size={36} />
                    <h3>No student profiles found</h3>
                    <p>Students need to complete onboarding first.</p>
                  </div>
                ) : (
                  <div className="mentor-student-grid">
                    {directory.map((student) =>
                      renderStudentCard(
                        student,
                        assignedIds.has(student.id)
                      )
                    )}
                  </div>
                )}
              </section>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
